FROM node:latest
WORKDIR /app
COPY . /app
RUN yarn install
