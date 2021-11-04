import threadFilter
from threadFilter import thread_extraction_pipeline
import mongoConfig
from mongoConfig import ProductionConfig

cur_user = "balajis"
# cur_user = "VitruviusCurve"
thread_length = 3

threads = thread_extraction_pipeline(cur_user, thread_length)
mongo = ProductionConfig()
mongo.create_user_tweet_db(cur_user, threads)
# first_t_statuses = threads[list(threads.keys())[0]]['statuses']
# print(first_t_statuses)
# print(threads[0])
print("done")
