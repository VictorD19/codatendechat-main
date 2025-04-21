FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache git tzdata

RUN npm install

COPY . .

RUN npm run build



ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 8080

CMD ["npm", "start"] 