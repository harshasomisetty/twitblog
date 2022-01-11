import threadFilter
from threadFilter import thread_extraction_pipeline
import mongoConfig
from mongoConfig import Config
import os

db = Config()


def load_all_data(authors=None):
    if not authors:
        authors = [f[1:-5] for f in os.listdir("../TData/tweets")]

    thread_length = 3
    # thread_extraction_pipeline("harshasomisetty", thread_length)

    for author in authors:
        db.delete_threads(author)
        threads = thread_extraction_pipeline(author, thread_length)
        db.insert_threads(author, threads)
        print("finished", author)


def test_mongo():
    test = db.list_authors()
    print(test)


if __name__ == "__main__":
    authors = ["cloudy_cl"]
    # authors=["farzaTV"]
    print(authors)
    # delete_author_data(author)

    load_all_data(authors)

    # test_mongo()
