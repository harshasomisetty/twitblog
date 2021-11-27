
# Table of Contents

1.  [Twitter to Blog](#org43c578e)
    1.  [Premise](#orgb554ccd)
    2.  [Plan](#org0b6a65b)
        1.  [Steps](#org3e191f5)
    3.  [Other notes](#org5036197)


<a id="org43c578e"></a>

# Twitter to Blog


<a id="orgb554ccd"></a>

## Premise

Twitter has so much information hidden in it's threads, but navigating them by topic is somewhat hard.

This is my attempt at using Twitter's API o convert a user's account into a essentially a blog, done with MERN stack


<a id="org0b6a65b"></a>

## Plan


<a id="org3e191f5"></a>

### Steps

1.  UI

    1.  NEXT Main page lists highly engaged tweets in past with user bio, main tweet, keywords
    
    2.  TODO Back button to save preferences
    
    3.  TODO Search Page with advanced options
    
    4.  TODO search threads in author page
    
    5.  TODO Beautify
    
        1.  author page
        
            1.  add more author data
            
                1.  followers
                
                2.  main topics
            
            2.  make thread cards
            
            3.  Title formatting, adding a summary in thread card
        
        2.  Thread Page
        
            1.  Better text formatting and font
    
    6.  TODO Reccomendations

2.  Data

    1.  NEXT Auto Update Twitter data
    
    2.  NEXT Expand links
    
    3.  TODO summarize
    
    4.  TODO better keywords
    
        1.  NEXT Naval how to get rich no keywords bug


<a id="org5036197"></a>

## Other notes

Used [this vue and elastic tutorial](https://blog.patricktriest.com/text-search-docker-elasticsearch/) and [this other tutorial](https://blog.logrocket.com/full-text-search-with-node-js-and-elasticsearch-on-docker/) to help figure out the MERN stack

For refactoring the app after solidifying my stack, I used [this](https://www.section.io/engineering-education/build-and-dockerize-a-full-stack-react-app-with-nodejs-and-nginx/) link. Also, [this link](https://tiangolo.medium.com/react-in-docker-with-nginx-built-with-multi-stage-docker-builds-including-testing-8cc49d6ec305) help directly build the app and push into nginx

[This](https://github.com/fireship-io/tailwind-dashboard/blob/main/src/index.css) was amazing reference while figuring out tailwind

