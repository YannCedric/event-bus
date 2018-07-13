from node:alpine

RUN mkdir /app

COPY bus.js /app

COPY package.json /app

COPY events.js /app

WORKDIR /app

RUN npm i

CMD npm start