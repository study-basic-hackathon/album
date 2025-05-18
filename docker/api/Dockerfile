FROM node:21-alpine

# 作業ディレクトリ作成
WORKDIR /app

# 依存関係ファイルをコピーして install
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# src も含めてアプリ全体をコピー（本番用途なら別途 COPY 段階を分けてキャッシュ効かせる）
COPY . .

# ポート開放（Hono が listen してるポート）
EXPOSE 3000

# dev 用コマンド（compose.yml の方で command を上書きしてるので実際ここは使われないことが多い）
CMD ["npm", "run", "dev"]
