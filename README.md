
# Table of Contents

1.  [Twitter to Blog](#org6b16bd2)
    1.  [Premise](#org183dc53)
    2.  [Plan](#org3cf8a30)
        1.  [Barebones <code>[1/3]</code>](#org414083b)
        2.  [future](#orgf3e4c13)
    3.  [Storing data](#orgfb6a598)
        1.  [DB of user](#org65e1beb)
        2.  [DB of threads](#org9e4ece3)


<a id="org6b16bd2"></a>

# Twitter to Blog


<a id="org183dc53"></a>

## Premise

Twitter has so much information hidden in it's threads, but navigating them by topic is somewhat hard.

This is my attempt at using Twitter's API to convert a user's account into a essentially a blog


<a id="org3cf8a30"></a>

## Plan


<a id="org414083b"></a>

### Barebones <code>[1/3]</code>

1.  TODO Python to manage tweet data <code>[2/2]</code>

    1.  DONE Algo to get main thread tweets
    
    2.  DONE Make Titles of Threads keywords (find with spacy)

2.  TODO Elasticsearch to store data and query <code>[2/3]</code>

    1.  DONE Figure out schema
    
    2.  DONE save json data with python
    
    3.  TODO load data with JS

3.  TODO React to display Webpage <code>[0/1]</code>

    1.  TODO display threads
    
    2.  TODO Display threads per user
    
    3.  TODO display each thread in its own page
    
    4.  TODO Link each tweet to original page
    
    5.  TODO display each thread in a clean card
    
    6.  TODO Figure out nice UI
    
    7.  TODO Sort threads
    
        Overall, the plan is to do all the tweet data processing in python, and store data in mongo db, and serve results using flask
        then react connects to flask and makes it look


<a id="orgf3e4c13"></a>

### future

1.  TODO make spacy phrase finding cleaner by getting rid of numbers and common phrases

2.  TODO add engagement metrics, and display best threads at top

    1.  other options for thread display, sort by newest, oldest, longest, shortest, most famous


<a id="orgfb6a598"></a>

## Storing data


<a id="org65e1beb"></a>

### DB of user

store user id, keywords from all threads,


<a id="org9e4ece3"></a>

### DB of threads

needs to be elasticsearch for speed
each thread will have user id, text, keywords

