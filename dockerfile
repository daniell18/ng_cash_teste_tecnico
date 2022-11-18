FROM node:18.12.1

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . .

CMD [ "yarn", "dev" ]