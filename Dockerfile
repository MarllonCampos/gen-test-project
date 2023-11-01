FROM node:19
WORKDIR /app
COPY prisma /app/
COPY src /app/
COPY docs /app/
COPY package*.json /app/
COPY tsconfig.json /app/
EXPOSE 3000
RUN npm ci
RUN npm run build

