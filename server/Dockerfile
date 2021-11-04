FROM node:12.18.1

WORKDIR /app

COPY package*.json ./

EXPOSE 5000

COPY . .

RUN npm install

CMD npm run start
