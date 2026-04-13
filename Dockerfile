FROM node:18-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# Copia dependências do backend
COPY backend/package*.json ./backend/
COPY backend/package-lock.json ./backend/
RUN cd backend && npm ci --only=production

# Copia Prisma e gera client
COPY backend/prisma ./backend/prisma/
RUN cd backend && npx prisma generate

# Copia código fonte e compila
COPY backend/src ./backend/src/
COPY backend/tsconfig.json ./backend/
COPY backend/nest-cli.json ./backend/
RUN cd backend && npm run build

ENV PORT=3001
ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "backend/dist/main.js"]