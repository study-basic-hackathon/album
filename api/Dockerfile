FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 開発用に dev スクリプトを起動
CMD ["npm", "run", "dev"]
