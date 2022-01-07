import spacy
import pytextrank
from tqdm import tqdm
import dateutil.parser as dp
import configparser

import twitterApi
from twitterApi import TwitterAPI
from dataMgmt import load_tweets, save_threads_json

import tweepy

config = configparser.ConfigParser(interpolation=None)
config.read("config.ini")

api_mine = TwitterAPI(username=config['TwitterConfig']['Username'],
                      bearer_token=config['TwitterConfig']["Bearer"],
                      key=config['TwitterConfig']["ApiKey"],
                      secret=config['TwitterConfig']["ApiSecret"],
                      token=config['TwitterConfig']["Access"],
                      token_secret=config['TwitterConfig']["AccessSecret"])

# tweepy api
auth = tweepy.OAuthHandler(config['TwitterConfig']["ApiKey"],
                           config['TwitterConfig']["ApiSecret"])
auth.set_access_token(config['TwitterConfig']["Access"],
                      config['TwitterConfig']["AccessSecret"])

api = tweepy.API(auth)
client = tweepy.Client(bearer_token=config['TwitterConfig']["Bearer"])

data_dir = config['Data']['data_dir']


class DataPrep:
    # Class to run spacy pipeline
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.nlp.add_pipe("textrank")

    def prep_json_data(self, thread_tuples, cur_user, tweet_dict):
        final_data = []
        # print(tweet_dict[list(tweet_dict.keys())[0]])
        intros = [[text[0][0], ind] for ind, text in enumerate(thread_tuples)]
        # print(intros[0])
        stopwords = self.nlp.Defaults.stop_words
        # multiprocess all thread intros to get a potential title
        for doc, i in tqdm(self.nlp.pipe(intros, as_tuples=True)):
            t_full_text, t_ids = thread_tuples[i]
            statistics = tweet_dict[t_ids[0]]["public_metrics"]
            statistics["oldest_tweet"] = int(
                dp.parse(tweet_dict[t_ids[0]]["created_at"][:-1]).timestamp())

            statistics["youngest_tweet"] = int(
                dp.parse(tweet_dict[t_ids[-1]]["created_at"][:-1]).timestamp())

            statistics["thread_length"] = len(t_ids)
            thread_obj = {
                "_id":
                str(t_ids[0]),
                "author":
                cur_user,
                "tweets":
                list(zip(t_full_text, [str(i) for i in thread_tuples[i][1]])),
                "keywords": [
                    phrase.text for phrase in doc._.phrases[:5]
                    if phrase.text not in stopwords
                ],
                "statistics":
                statistics
            }
            thread_obj["title"] = title_gen(thread_obj, doc)
            thread_obj["test"] = int(
                dp.parse(tweet_dict[t_ids[0]]["created_at"][:-1]).timestamp())
            final_data.append(thread_obj)

        # creating a dict of tweet id to info
        return final_data


def title_gen(obj, doc):
    first_tweet = obj["tweets"][0][0]
    first_sentence = str(list(doc.sents)[0])

    if len(first_tweet.split(" ")) < 10:
        finalSent = first_tweet
    if len(first_sentence.split(" ")) < 11:
        finalSent = first_sentence
    else:
        return ""

    firstPart = finalSent.split(" ")[0]
    lastPart = finalSent.split(" ")[-1]
    if firstPart == "1/" or firstPart == "/1":
        finalSent = finalSent[3:]

    if lastPart == "1/" or lastPart == "/1":
        finalSent = finalSent[:-2]

    return finalSent


def get_ref_types(tweet):  #extract all quotes or reference material
    ref_types = {}

    if "referenced_tweets" in tweet.keys():
        for ref in tweet["referenced_tweets"]:
            ref_types[ref["type"]] = int(ref["id"])

    return ref_types


def get_threads(tweet_dict):

    roots = {}  # dict of (tweetid -> text and children)
    t_ancestor = {}  # (tweet id -> oldest known parent)

    for t_id, t_payload in tweet_dict.items():
        ref_types = get_ref_types(t_payload)

        if "retweeted" in ref_types.keys():  # ignore all normal retweets
            continue

        if "replied_to" not in ref_types.keys():  # tweet is original (root)

            roots[t_id] = [t_id]
            t_ancestor[t_id] = -1

        elif t_payload["author_id"] == t_payload["in_reply_to_user_id"]:
            # tweet is a reply to self
            parent = ref_types["replied_to"]  #id of parent tweet

            if parent in t_ancestor.keys():
                if t_ancestor[parent] == -1:  # parent is the root
                    t_ancestor[t_id] = parent
                    roots[parent].append(t_id)

                else:  #parent is not the root
                    ancestor = t_ancestor[parent]
                    t_ancestor[t_id] = ancestor
                    roots[ancestor].append(t_id)
    return roots


def clean_threads(tweet_dict, thread_dict, thread_length: int):
    threads = []
    for root, t_ids in thread_dict.items():
        if len(t_ids) > thread_length:
            text = []
            for status in t_ids:
                text.append(
                    tweet_dict[status]["text"].strip().rstrip("...").strip())
                # text += "\n\n**********\n\n"
            threads.append([text, t_ids])
    return threads


def thread_extraction_pipeline(cur_user: str, thread_length: int):

    # thread_dir = data_dir + cur_user + "/"

    # user_data = api_mine.user_lookup(cur_user, payload=["created_at"])
    # start_date = user_data["created_at"]

    # print(start_date)
    # # print(client.rate_limit_status()['resources']["tweets"])
    # tweet_location = data_dir + "tweets/u" + cur_user + ".json"
    # query = 'from:harshasomisetty -is:retweet'

    # tweet_fields = [
    #     "created_at", "in_reply_to_user_id", "referenced_tweets",
    #     "public_metrics"
    # ]

    # print()
    # with open(tweet_location, 'w+') as filehandle:
    #     for response in tweepy.Paginator(client.search_all_tweets,
    #                                      query=query,
    #                                      tweet_fields=tweet_fields,
    #                                      start_time=start_date,
    #                                      max_results=100).flatten(limit=1000):
    #         print(response)

    # tweets = api_mine.search_all_tweets()
    tweet_dict = load_tweets(cur_user, api_mine)
    thread_dict = get_threads(tweet_dict)  # dict of (root id, children)
    threads = clean_threads(tweet_dict, thread_dict,
                            3)  # attaches tweet test, stores thread ids

    final_threads = DataPrep().prep_json_data(threads, cur_user, tweet_dict)
    # print(final_threads[0]["title"])
    save_threads_json(final_threads, cur_user)
    print("got", str(len(threads)), "threads")

    return final_threads
