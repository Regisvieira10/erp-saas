FROM node:20-alpine

# Dependência necessária para o Prisma no Alpine
RUN apk add --no-cache openssl

WORKDIR /app

# Copiar dependências e instalar
COPY package*.json ./
RUN npm install

# Copiar o schema do Prisma e gerar o client
COPY prisma ./prisma/
RUN npx prisma generate

# Copiar o restante do código e compilar o TypeScript
COPY . .
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "dist/main.js"]