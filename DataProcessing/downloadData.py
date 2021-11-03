import threadFilter
from threadFilter import thread_extraction_pipeline

# cur_user = "punk6529"
cur_user = "VitruviusCurve"
thread_length = 3

threads = thread_extraction_pipeline(cur_user, thread_length)

first_t_statuses = threads[list(threads.keys())[0]]['statuses']
print(first_t_statuses)
