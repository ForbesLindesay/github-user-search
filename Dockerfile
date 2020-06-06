FROM node:12-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install --production \
  && yarn cache clean

COPY build /app/build
COPY server.mjs /app/server.mjs

CMD cd /app && yarn start:prod