FROM node:alpine

WORKDIR /app

COPY package*.json /

COPY . .

RUN npm install

ARG REACT_APP_SERVER_PORT

ENV REACT_APP_SERVER_PORT ${REACT_APP_SERVER_PORT}

ENTRYPOINT ["npm", "start"]
