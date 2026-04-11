FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ .
RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]
