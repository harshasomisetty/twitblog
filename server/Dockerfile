FROM node:12.18.1 as base

WORKDIR /app

COPY package*.json ./
EXPOSE 5000

FROM base as test
RUN npm install
COPY . .
RUN npm test

FROM base as prod

EXPOSE 5000
COPY . .

RUN npm install
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

LABEL org.opencontainers.image.source https://github.com/harshasomisetty/TwitBlog
CMD npm run start



