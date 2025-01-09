FROM node:22.11 AS builder
WORKDIR /usr/app/builder
ARG access_key
ENV IPSTACK_ACCESS_KEY=$access_key
COPY ./ ./
RUN npm install
RUN npm run eslint && npm run test
RUN npm install -g .
