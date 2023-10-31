FROM node:19
WORKDIR /app
COPY prisma /app/
COPY src /app/
COPY docs /app/
COPY .env /app/
COPY package*.json /app/
COPY tsconfig.json /app/
RUN npm ci
RUN npm run build
RUN npx prisma migrate deploy
CMD ["npm","run","start"]
