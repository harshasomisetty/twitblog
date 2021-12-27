FROM node:12.18.1 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV REACT_APP_DOCKER_ENV 67.207.93.146
RUN export REACT_APP_DOCKER_ENV="67.207.93.146"
RUN echo $REACT_APP_DOCKER_ENV

COPY . .

EXPOSE 3000

RUN npm run build

FROM nginx

EXPOSE 3000


LABEL org.opencontainers.image.source https://github.com/harshasomisetty/TwitBlog

COPY --from=build-stage /app/build /usr/share/nginx/html

COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf


RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
ENV REACT_APP_DOCKER_ENV 67.207.93.146
RUN export REACT_APP_DOCKER_ENV="67.207.93.146"
RUN echo $REACT_APP_DOCKER_ENV

