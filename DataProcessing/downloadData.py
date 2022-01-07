import threadFilter
from threadFilter import thread_extraction_pipeline
import mongoConfig
from mongoConfig import Config

db = Config()


def load_all_data(authors=None):
    if not authors:
        authors = [
            "VitruviusCurve", "balajis", "naval", "cloudy_cl", "SBF_FTX"
        ]

    thread_length = 3
    # thread_extraction_pipeline("harshasomisetty", thread_length)

    for author in authors:
        threads = thread_extraction_pipeline(author, thread_length)

    db.insert_threads(author, threads)

    print("done", "harshasomisetty")


def delete_author_data(author):
    deleted_count = db.delete_threads(author)
    print("deleted", deleted_count)


def test_mongo():
    test = db.list_authors()
    print(test)


if __name__ == "__main__":
    authors = ["Ksidiii"]

    # delete_author_data(author)

    load_all_data(authors)

    # test_mongo()
