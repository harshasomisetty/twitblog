from tqdm import tqdm
import os
import json
import urlexpander
import re
import spacy
import pytextrank
import twitterApi
from twitterApi import TwitterAPI

import configparser

config = configparser.ConfigParser(interpolation=None)
config.read("config.ini")

api = TwitterAPI(username=config['TwitterConfig']['Username'],
                 bearer_token=config['TwitterConfig']["Bearer"],
                 key=config['TwitterConfig']["ApiKey"],
                 secret=config['TwitterConfig']["ApiSecret"],
                 token=config['TwitterConfig']["Access"],
                 token_secret=config['TwitterConfig']["AccessSecret"])

data_dir = config['Data']['data_dir']


class DataPrep:
    # Class to run spacy pipeline
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.nlp.add_pipe("textrank")

    def prep_json_data(self, thread_tuples, cur_user):
        final_data = []

        intros = [[text[0].split("\n**********\n")[0], ind]
                  for ind, text in enumerate(thread_tuples)]
        stopwords = self.nlp.Defaults.stop_words
        # multiprocess all thread intros to get a potential title
        for doc, i in tqdm(self.nlp.pipe(intros, as_tuples=True)):
            t_full_text, t_ids = thread_tuples[i]
            final_data.append({
                "_id":
                str(t_ids[0]),
                "author":
                cur_user,
                "text":
                t_full_text,
                "keywords":
                ", ".join([
                    phrase.text for phrase in doc._.phrases[:5]
                    if phrase.text not in stopwords
                ]),
                "statuses":
                thread_tuples[i][1]
            })

        # creating a dict of tweet id to info
        return final_data


# converts list of json tweet list into dict
# key of dict is status id, value is other payload info
def get_tweet_dict(tweets):
    tweet_dict = {}
    for tweet in reversed(tweets):
        tweet_dict[int(tweet["id"])] = {
            key: val
            for key, val in tweet.items() if key != "id"
        }
    return tweet_dict


def load_tweets(username: str, api):
    tweet_location = data_dir + "tweets/u" + username + ".json"
    # download tweets again if doesn't already exist
    if username in [file[1:-5] for file in os.listdir(data_dir + "tweets")]:
        print("Loading previously downloaded", username, "tweets")
        with open(tweet_location, "r") as file:
            tweets = json.loads(file.read())
    else:
        print("Downloading new", username, "tweets")

        tweets = api.get_historical_tweets(username)
        if tweets != -1:
            with open(tweet_location, "w+") as file:
                json.dump(tweets, file, indent=1)
    return get_tweet_dict(tweets)


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


# TODO make link stripping nicer (remove Twit status, fix exception
def insert_link(link: str):
    website = urlexpander.expand(link)
    if "twitter.com" in website:
        status_num = re.search("status\/[0-9]*", website).group(0)
        return "\n[[" + website + "][" + "Twit Status " + str(
            status_num) + "]]\n"
    #detect if twitter link or not
    # if twitter, specify twitter
    # if not twitter, get name of website
    else:
        try:
            domain = re.search("https:\/\/[a-zA-Z0-9]*\.[a-z]*\/",
                               website).group(0)
        except:
            domain = "ref"
        return "\n[[" + website + "][" + domain + "]]\n"


def expand_tweet_text(text: str, expand=False):

    if expand:
        sentences = [s for s in text.split("\n")]
        text = ""
        for sentence in sentences:
            words = [w for w in sentence.split(" ")]
            for i in range(len(words)):
                # if re.match('https:\/\/t.co\/[a-zA-Z0-9]*', words[i]):
                if "https://t.co/" in words[i]:

                    words[i] = insert_link(words[i])  # can expand links

            text += " ".join(words) + "\n"

    return text


def clean_threads(tweet_dict, thread_dict, thread_length: int):
    threads = []
    for root, t_ids in thread_dict.items():
        if len(t_ids) > thread_length:
            text = ""
            for status in t_ids:
                text += tweet_dict[status]["text"]
                text += "\n\n**********\n\n"
            threads.append([text, t_ids])
    return threads


def save_threads(threads, cur_user: str):
    thread_dir = data_dir + cur_user + "/"
    for thread in threads:
        text = thread[0]
        t_ids = thread[1]
        with open(thread_dir + str(t_ids[0]) + ".org", "w+") as file:
            file.write("[[https://twitter.com/" + cur_user + "/status/" +
                       str(t_ids[0]) + "][Original Thread]]\n\n\n\n")
            file.write(expand_tweet_text(text))


def save_threads_json(threads, cur_user: str):
    thread_dir = data_dir + "threads/" + cur_user + ".json"

    with open(thread_dir, "w+") as file:
        json.dump(threads, file, indent=1)


def thread_extraction_pipeline(cur_user: str, thread_length: int):
    thread_dir = data_dir + cur_user + "/"
    tweet_dict = load_tweets(cur_user, api)
    thread_dict = get_threads(tweet_dict)  # dict of (root id, children)
    threads = clean_threads(tweet_dict, thread_dict,
                            3)  # attaches tweet test, stores thread ids

    final_threads = DataPrep().prep_json_data(threads, cur_user)
    save_threads_json(final_threads, cur_user)
    print("got", str(len(threads)), "threads")

    return final_threads
