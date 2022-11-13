FROM node:16
WORKDIR /usr/src/raptors
COPY package.json .
COPY yarn.lock .

RUN apt-get update && apt-get install -y yarn
RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn", "build-start" ]
