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

        self.cluster = pymongo.MongoClient(os.getenv("MONGO_URI"))

    def create_author_thread_db(self, author, threads):
        collection = self.cluster["threads"][author]
        collection.drop()
        collection.insert_many(threads)

    def create_author_data_db(self, author, data):
        collection = self.cluster["authors"]["info"]
        collection.insert(data)
