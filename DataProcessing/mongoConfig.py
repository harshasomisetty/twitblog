import pymongo
from pymongo import MongoClient
import urllib.parse
from dotenv import load_dotenv
import os

load_dotenv("../.env")


class Config(object):
    DEBUG = False
    TESTING = False


class ProductionConfig(Config):
    def __init__(self):
        self.MONGO_URI = "mongodb+srv://"+os.getenv("MONGO_USER")+\
            ":"+urllib.parse.quote(str(os.getenv("MONGO_PASS")))+\
            "@cluster0.apaqs.mongodb.net/"+str(os.getenv("MONGO_DB"))+\
            "?retryWrites=true&w=majority"
        self.cluster = pymongo.MongoClient(self.MONGO_URI)
        self.db = self.cluster["production"]

    def create_user_tweet_db(self, author, threads):
        collection = self.db[author]
        collection.drop()
        collection.insert_many(threads)
