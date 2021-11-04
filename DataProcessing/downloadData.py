import threadFilter
from threadFilter import thread_extraction_pipeline
import mongoConfig
from mongoConfig import ProductionConfig

# cur_user = "balajis"
cur_user = "VitruviusCurve"
thread_length = 3

threads = thread_extraction_pipeline(cur_user, thread_length)
mongo = ProductionConfig()
mongo.create_author_thread_db(cur_user, threads)
print(threads[0])
# with open("keywords.txt", "w+") as file:
#     for thread in threads:
#         file.write("\n".join(thread["keywords"]) + "\n*****\n\n")
print("done")
