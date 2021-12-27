FROM node:12.18.1 as base

WORKDIR /app
RUN echo "hi1"
COPY package*.json ./
EXPOSE 5000
FROM base as test
RUN npm install
COPY . .
RUN npm test

FROM base as prod

EXPOSE 5000
COPY . .

RUN echo "hi3"
RUN npm install
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

ENV REACT_APP_DOCKER_ENV 67.207.93.146

LABEL org.opencontainers.image.source https://github.com/harshasomisetty/TwitBlog
RUN echo "hi2"
RUN export REACT_APP_DOCKER_ENV="67.207.93.146"
RUN echo $REACT_APP_DOCKER_ENV
CMD npm run start



