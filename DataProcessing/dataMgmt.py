import os
import json
import configparser

from utils import expand_tweet_text

config = configparser.ConfigParser(interpolation=None)
config.read("config.ini")

data_dir = config['Data']['data_dir']


def load_tweets(username: str, api):
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
        print("saved", username, "tweets")

    return get_tweet_dict(tweets)


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
