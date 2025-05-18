# 華道用写真共有Webアプリ

## 概要

このアプリは、華道の写真を共有するための Web アプリケーションです。
バックエンドは [Hono](https://hono.dev)、フロントエンドは [Vite](https://vitejs.dev) + React によって構成されています。
Docker を使ってローカルで簡単に開発・動作確認ができます。

---

## 必要なもの

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - macOS: Apple Silicon / Intel 両対応
  - Windows: WSL2 有効化推奨

---

## 初期設定

### 1. Docker をインストール

#### ✅ macOS の場合

Homebrew を使ってインストールできます：

```bash
brew install --cask docker
open /Applications/Docker.app
```

起動後、ステータスバーに Docker のクジラマークが表示されていれば準備完了です。

#### ✅ Windows の場合

以下からインストーラをダウンロードして実行：

[https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

※ WSL2 を有効にしておくとパフォーマンスが向上します。

---

### 2. `.env` ファイルを作成

プロジェクトルートに `.env` ファイルを作成し、以下の内容を記述してください：

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=myapp

API_PORT=3000
CLIENT_PORT=5173
```

---

## 開発環境の起動

### ビルド

初回はビルドが必要です：

```bash
docker compose build
```

### 起動

開発サーバーをバックグラウンドで起動します：

```bash
docker compose up -d
```

### 停止

サーバーを停止するには：

```bash
docker compose down
```

---

## データベースへのアクセス

PostgreSQL に接続するには以下のコマンドを使用します：

```bash
docker compose exec db psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
```

`.env` ファイルの変数 `POSTGRES_USER` と `POSTGRES_DB` を参照して接続します。

---

## 開発の進め方

### 🔁 Hono（API）を編集 → ホットリロードで自動再起動

`./api/src` 以下のファイルを編集すると、Docker コンテナ内で Hono がホットリロードされて再起動されます。

使用ツール：`npm run dev`（内部で `tsx watch` を使用）

---

### 🔁 Vite/React（フロント）を編集 → 即座にブラウザに反映

`./client/src` 以下のファイルを編集すると、Vite によって即座にブラウザに反映されます。

アクセスURL（ブラウザで開く）：

```
http://localhost:5173
```

APIエンドポイント（フロントからの通信）：

```
http://localhost:3000
```

---

## フォルダ構成（抜粋）

```
.
├── api/          # Hono によるバックエンド
├── client/       # Vite + React によるフロントエンド
├── docker/       # Dockerfile 群
├── docker-compose.yml
└── .env          # 環境変数（手動で作成）
```
