# 開発環境構築手順（Node.js + Express + PostgreSQL）

このドキュメントは、Docker を使って Node.js（Express）と PostgreSQL の開発環境を構築し、SQL を使ってデータベースを初期化するまでの手順をまとめたものです。

---

## 📦 環境構築

## 環境変数の定義

### `.env` ファイルの作成

次の内容のファイルをこのファイルがあるのと同じ階層に `.env` という名前で作成します。

```
# DB設定
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=app
POSTGRES_PASSWORD=Passw0rd!1234
POSTGRES_DB=app

# Express設定
PORT=3000
HOST=0.0.0.0
```

### Docker のインストール（macOS / Windows）

- **macOS**

  - [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) をインストール
  - `brew install --cask docker` でも可（Homebrew を使っている場合）

- **Windows**
  - [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) をインストール
  - WSL2 が必要になるため、必要に応じて案内に従ってセットアップ

### Docker の起動と確認

- Docker Desktop を起動
- ターミナルまたはコマンドプロンプトで以下を実行し、起動状態を確認：

```bash
docker version
docker info
```

---

## ⚙️ Docker Compose

### Docker Compose とは？

- 複数の Docker コンテナ（例：APIサーバ + DB）をまとめて定義・起動できるツール
- `docker-compose.yml` で構成を宣言的に記述できる

### Docker Compose のビルド

```bash
docker compose build
```

- 各サービス（Node.js API など）のイメージをビルドする

### Docker Compose の起動

```bash
docker compose up
```

- サービスを起動
- `-d` をつけるとバックグラウンド起動：

```bash
docker compose up -d
```

### 停止

```bash
docker compose down
```

- `-v` をつけるとデータベースなどのボリュームも削除される：

```bash
docker compose down -v
```

---

## 🗃 データベースの初期化

### 初期化用 SQL ファイルの配置

- `sql/init.sql` を作成して以下のように `post` テーブルを定義：

```sql
CREATE TABLE IF NOT EXISTS post (
  id SERIAL PRIMARY KEY AUTO_INCREMENT,
  body VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### SQL を Docker コンテナから実行する

```bash
docker compose exec db psql -U app -d app -f /docker-entrypoint-initdb.d/init.sql
```

`.env` を使っている場合でも、ここでは環境変数展開が効かないので直接値を書くのが確実です。

.env に書いてある内容に置き換えてください。

- ファイルパスの確認：

```bash
docker compose exec db ls /docker-entrypoint-initdb.d
```

### 結果確認

```bash
docker compose exec db psql -U app -d app -c "SELECT * FROM post;"
```

## データベースにCLIで接続

```bash
docker compose exec db psql -U app -d app
```

---

## ✅ 動作確認

### Express API にアクセス

```bash
curl http://localhost:3000/
```

### 応答例

```txt
Hello World!
```

---

## 📁 ディレクトリ構成（抜粋）

```
api/
├── .env
├── Dockerfile
├── docker-compose.yml
├── sql/
│   └── init.sql
└── src/
    ├── app.js
    ├── db.js
    └── server.js
```
