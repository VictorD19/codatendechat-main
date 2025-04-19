FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache git tzdata

ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"] 