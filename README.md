# 華道用写真共有Webアプリ

# 環境

- Docker

# Docker Compose

## ビルド

```bash
docker-compose build
```
## 起動

```bash
docker-compose up -d
```
## 停止

```bash
docker-compose down
```

# データーベースへのアクセス

コンテナを起動後に以下のコマンドを実行することで、PostgreSQLのコンテナにアクセスできます。

```bash
docker-compose exec db psql -U user -d myapp
```
