from flask import Flask
from downloadData import *
import os

app = Flask(__name__)


@app.route('/')
def start_page():
    users = [user[1:-5] for user in os.listdir("data/tweets/")]


@app.route('/<name>')
def tweet_display(name):
    tweet_dict = load_tweets(name)
    threads = get_threads(tweet_dict)  # dict of (root id, children)
    long_indexes = trim_threads(4, threads)  # status id list of long threads
    print(len(long_indexes))
    print_thread(tweet_dict, threads[long_indexes[-1]])


if __name__ == '__main__':
    app.run()
