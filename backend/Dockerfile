FROM node:13.7.0-alpine3.10

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn

COPY . .

EXPOSE 5000

CMD yarn start