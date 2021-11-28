FROM node:12.18.1

WORKDIR /app

COPY package*.json ./

EXPOSE 5000

COPY . .

RUN npm install
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
CMD npm run start
