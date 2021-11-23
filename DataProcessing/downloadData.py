import threadFilter
from threadFilter import thread_extraction_pipeline
import mongoConfig
from mongoConfig import ProductionConfig


def load_all_data(authors):
    if not authors:
        authors = ["VitruviusCurve", "balajis"]

    thread_length = 3

    for author in authors:
        threads = thread_extraction_pipeline(author, thread_length)

        # ProductionConfig().create_author_thread_db(cur_user, threads)
        ProductionConfig().insert_threads(author, threads)
        print(threads[0]["keywords"])

        print("done", author)


def delete_author_data(author):
    deleted_count = ProductionConfig().delete_threads(author)
    print("deleted", deleted_count)


if __name__ == "__main__":
    authors = ["cloudy_cl"]
    # delete_author_data(author)

    load_all_data(authors)
