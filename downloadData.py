from TwitBlog.twitterApi import TwitterAPI
import configparser
import os
import json
import urlexpander

config = configparser.ConfigParser(interpolation=None)

config.read("config.ini")
cur_user = "balajis"

api = TwitterAPI(username=config['TwitterConfig']['Username'],
                 bearer_token=config['TwitterConfig']["Bearer"],
                 key=config['TwitterConfig']["ApiKey"],
                 secret=config['TwitterConfig']["ApiSecret"],
                 token=config['TwitterConfig']["Access"],
                 token_secret=config['TwitterConfig']["AccessSecret"])


def _prev_downloaded_tweets():
    return [file[1:-5] for file in os.listdir("data/tweets/")]


def get_tweet_dict(tweets):
    tweet_dict = {}
    for tweet in reversed(tweets):
        tweet_dict[int(tweet["id"])] = {
            key: val
            for key, val in tweet.items() if key != "id"
        }
    return tweet_dict


def load_tweets(username: str):

    if username in _prev_downloaded_tweets():
        #        print("Loading previously downloaded", username, "tweets")

        with open("data/tweets/u" + username + ".json", "r") as file:
            tweets = json.loads(file.read())
    else:
        #        print("Downloading new", username, "tweets")

        tweets = api.get_historical_tweets(username)
        if tweets != -1:
            with open("data/tweets/u" + username + ".json", "w+") as file:
                json.dump(tweets, file, indent=1)
    return get_tweet_dict(tweets)


def get_ref_types(tweet):  #extract all quotes or reference material
    ref_types = []
    if "referenced_tweets" in tweet.keys():
        for ref in tweet["referenced_tweets"]:
            ref_types.append(ref["type"])

    return ref_types


def get_replied_to(tweet):
    for ref in tweet["referenced_tweets"]:
        if ref["type"] == "replied_to":
            return int(ref["id"])


def get_threads(tweet_dict):

    roots = {}  # dict of (tweetid -> text and children)
    t_ancestor = {}  # (tweet id -> oldest known parent)

    for t_id, t_payload in tweet_dict.items():
        ref_types = get_ref_types(t_payload)

        if "retweeted" in ref_types:  # ignore all normal retweets
            continue

        if "replied_to" not in ref_types:  # tweet is original (root)

            roots[t_id] = [t_id]
            t_ancestor[t_id] = -1

        elif t_payload["author_id"] == t_payload["in_reply_to_user_id"]:
            # tweet is a reply to self
            parent = get_replied_to(t_payload)  #id of parent tweet

            if parent in t_ancestor.keys():
                if t_ancestor[parent] == -1:  # parent is the root
                    t_ancestor[t_id] = parent
                    roots[parent].append(t_id)
                    # print(parent, roots[parent])

                else:  #parent is not the root
                    # print(parent)
                    ancestor = t_ancestor[parent]
                    t_ancestor[t_id] = ancestor
                    roots[ancestor].append(t_id)
    return roots


def trim_threads(tweet_count: int, threads):
    long_thread_ids = []
    for t_id, tweets_in_thread in threads.items():
        if len(tweets_in_thread) > tweet_count:
            long_thread_ids.append(t_id)

    return long_thread_ids


def expand_tweet_text(text: str):
    return text


def print_thread(tweet_dict, thread_tweet_ids):
    with open("thread.org", "w+") as file:
        file.write("[[https://twitter.com/" + cur_user + "/status/" +
                   str(thread_tweet_ids[0]) + "][Original Thread]]\n\n\n\n")
        for t_id in thread_tweet_ids:
            file.write(expand_tweet_text(tweet_dict[t_id]["text"]) + "\n\n")


if __name__ == "__main__":
    tweet_dict = load_tweets(cur_user)
    threads = get_threads(tweet_dict)  # dict of (root id, children)
    long_indexes = trim_threads(4, threads)  # status id list of long threads
    print(len(long_indexes))
    print_thread(tweet_dict, threads[long_indexes[-1]])
