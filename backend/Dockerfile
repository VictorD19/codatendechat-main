FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache git

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"] 