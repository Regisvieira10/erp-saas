FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
COPY package-lock.json* ./
RUN npm ci --production || npm install --omit=dev

COPY . .

RUN npx prisma generate

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "dist/main.js"]