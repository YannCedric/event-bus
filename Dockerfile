from node:alpine

RUN mkdir /app

COPY bus.js /app

COPY package.json /app

COPY EventBus.js /app

COPY dockerConfig.js /app 

WORKDIR /app

RUN npm i

ENV ENV docker

CMD node dockerConfig.js