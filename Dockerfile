FROM node:latest

WORKDIR /app

COPY package.json tsconfig.json ./

RUN npm install

COPY src ./src

RUN npx tsc

EXPOSE 8222

CMD ["node", "dist/index.js"]
