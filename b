#!/bin/bash

docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker-compose build 
docker push ghcr.io/harshasomisetty/twit_frontend:latest
docker push ghcr.io/harshasomisetty/twit_server:latest
#docker-compose up
ssh docean "./b"
