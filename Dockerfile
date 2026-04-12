FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# Copiar dependências do backend
COPY backend/package*.json ./
RUN npm install

# Copiar schema do Prisma e gerar client
COPY backend/prisma ./prisma/
RUN npx prisma generate

# Copiar todo o código do backend e compilar
COPY backend/ .
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "dist/main.js"]
