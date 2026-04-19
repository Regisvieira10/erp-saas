FROM node:18-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# Instalar TODAS as dependências (incluindo devDependencies para o build)
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Gerar o Prisma Client
COPY backend/prisma ./backend/prisma/
RUN cd backend && npx prisma generate

# Copiar código fonte e compilar
COPY backend/src ./backend/src/
COPY backend/tsconfig.json ./backend/
COPY backend/nest-cli.json ./backend/
RUN cd backend && npm run build

# Remover devDependencies após build (imagem final mais leve)
RUN cd backend && npm prune --production

ENV PORT=3001
ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "backend/dist/main.js"]