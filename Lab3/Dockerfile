FROM node:16

RUN apt-get update && apt-get install -y yarn 

WORKDIR /usr/src/raptors
COPY package.json .
COPY yarn.lock .

WORKDIR /usr/src/raptors/client
COPY ./client/package.json .
COPY ./client/yarn.lock .

WORKDIR /usr/src/raptors
RUN yarn react:install
RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn", "build-start" ]
