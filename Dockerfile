FROM node:10.16.0

RUN apt-get update -y \
  && apt-get install -y mysql-client \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN npm install knex -g

# Create app directory
RUN mkdir -p /usr/src/travel-brochure-api
WORKDIR /usr/src/travel-brochure-api

# Install app dependencies
COPY package.json /usr/src/travel-brochure-api
RUN npm install

# Bundle app source
COPY . /usr/src/travel-brochure-api

# Environment
ENV NODE_VERSION 10.16.0

CMD [ "npm", "start" ]