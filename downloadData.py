from TwitBlog.twitterApi import TwitterAPI
from TwitBlog.threadFilter import thread_extraction_pipeline
import configparser
import spacy
import pytextrank
import json

nlp = spacy.load("en_core_web_sm")
nlp.add_pipe("textrank")

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
    # text = "What does due process look like for social networks? I believe in the medium term, the next generation of social networks will be built from the ground up to use crypto for governance."

    # doc = nlp(text)
    # for phrase in doc._.phrases:
    #     print(phrase.text)
    #     print(phrase.rank, phrase.count)
    #     print(phrase.chunks)

    thread_extraction_pipeline(api, cur_user, thread_length)
