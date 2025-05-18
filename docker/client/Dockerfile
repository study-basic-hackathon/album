# docker/client/Dockerfile
FROM node:21-alpine

WORKDIR /app

COPY ./client/package*.json ./
RUN npm install

COPY ./client ./

EXPOSE 5173

# Vite を 0.0.0.0 にバインド（--host）
CMD ["npm", "run", "dev", "--", "--host"]
