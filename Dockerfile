FROM node:19-alpine AS node

FROM node AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build:all

FROM node AS final

RUN mkdir -p /app/dist
RUN mkdir -p /app/prisma
RUN mkdir -p /app/public
RUN mkdir -p /app/src/server/views

WORKDIR /app

COPY package*.json ./
COPY .env.defaults ./

RUN npm i --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/server/views ./src/server/views

RUN npm run migration:run
RUN npm run db:client:init

ENTRYPOINT ["npm", "run", "start"]