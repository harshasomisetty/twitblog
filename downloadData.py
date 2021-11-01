from TwitBlog.twitterApi import TwitterAPI
from TwitBlog.threadFilter import thread_extraction_pipeline
from TwitBlog.infoPipeline import DataPrep
import configparser
import json

config = configparser.ConfigParser(interpolation=None)
config.read("config.ini")

api = TwitterAPI(username=config['TwitterConfig']['Username'],
                 bearer_token=config['TwitterConfig']["Bearer"],
                 key=config['TwitterConfig']["ApiKey"],
                 secret=config['TwitterConfig']["ApiSecret"],
                 token=config['TwitterConfig']["Access"],
                 token_secret=config['TwitterConfig']["AccessSecret"])

if __name__ == "__main__":
    cur_user = "punk6529"
    # cur_user = "balajis"
    thread_length = 3

    threads = thread_extraction_pipeline(api, cur_user, thread_length)

    ling = DataPrep()

    final_threads = ling.prep_json_data(threads, cur_user)
    with open("test.json", "w+") as file:
        json.dump(final_threads, file, indent=1)
    # text = threads[-2][0].split("\n**********\n")[0]
    # doc = ling.nlp(text)
    # for phrase in doc._.phrases[:5]:
    #     print(phrase.text)
    #     print(phrase.rank, phrase.count)
    #     print(phrase.chunks)
