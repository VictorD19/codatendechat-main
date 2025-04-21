FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache git tzdata

RUN npm install

COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build