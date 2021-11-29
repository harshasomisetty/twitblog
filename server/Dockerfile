FROM node:12.18.1

LABEL org.opencontainers.image.source https://github.com/harshasomisetty/TwitBlog

WORKDIR /app

COPY package*.json ./

EXPOSE 5000

COPY . .

RUN npm install
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
CMD npm run start
