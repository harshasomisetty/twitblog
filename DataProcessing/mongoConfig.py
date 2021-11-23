import pymongo
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import urllib.parse
from dotenv import load_dotenv
import os

load_dotenv(".env")


class Config(object):
    DEBUG = False
    TESTING = False


class ProductionConfig(Config):
    def __init__(self):

        self.cluster = pymongo.MongoClient(os.getenv("MONGO_URI"))
        try:
            print("connecting to mongo")
        except ConnectionFailure:
            print("Server not available")
        else:
            print("connected to mongo")

        self.database = self.cluster["Twitter"]

    def create_author_thread_db(self, author, threads):
        collection = self.cluster["threads"][author]
        collection.drop()
        collection.insert_many(threads)

    def create_author_data_db(self, author, data):
        collection = self.cluster["authors"]["info"]
        collection.insert(data)

    def insert_threads(self, author, data):
        collection = self.cluster["Twitter"]["threads"]
        ids = [doc["_id"] for doc in data]
        collection.delete_many({"_id": {"$in": ids}})
        collection.insert_many(data)

    def delete_threads(self, author):
        collection = self.cluster["Twitter"]["threads"]
        deleted_count = collection.delete_many({"author": author})
        return deleted_count.deleted_count

    def list_authors(self):
        collection = self.cluster["Twitter"]["threads"]
        distinct = collection.distinct("author")
        return distinct
