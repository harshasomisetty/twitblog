from TwitBlog.twitterApi import TwitterAPI
from TwitBlog.threadFilter import thread_extraction_pipeline

import configparser

config = configparser.ConfigParser(interpolation=None)
config.read("config.ini")

api = TwitterAPI(username=config['TwitterConfig']['Username'],
                 bearer_token=config['TwitterConfig']["Bearer"],
                 key=config['TwitterConfig']["ApiKey"],
                 secret=config['TwitterConfig']["ApiSecret"],
                 token=config['TwitterConfig']["Access"],
                 token_secret=config['TwitterConfig']["AccessSecret"])

if __name__ == "__main__":
    # cur_user = "punk6529"
    cur_user = "balajis"
    thread_length = 3

    threads = thread_extraction_pipeline(api, cur_user, thread_length)

    print(threads[list(threads.keys())[0]])
