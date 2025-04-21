FROM node:18-alpine AS builder

WORKDIR /app

# Instala o git e outras dependências necessárias
RUN apk add --no-cache git

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN echo "Iniciando build do frontend..."
RUN npm run build
RUN echo "Build completo. Listando conteúdo:"
RUN ls -la
RUN ls -la build/ || echo "Diretório build não encontrado, verificando dist" && ls -la dist/ || echo "Nenhum diretório de build padrão encontrado"

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]