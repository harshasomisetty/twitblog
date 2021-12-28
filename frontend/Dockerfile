FROM node:12.18.1 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx

LABEL org.opencontainers.image.source https://github.com/harshasomisetty/TwitBlog

COPY --from=build-stage /app/build /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf


RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]


