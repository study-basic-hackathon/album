# クライアント

## `.env`

環境変数をAPIのベースURLに設定します。以下のように`.env`ファイルを作成してください。

```
VITE_API_BASE_URL=http://localhost:3000
VITE_MOCK_SERVER_ENABELD=true
VITE_CLIENT_BASE_PATH=/
```

## 依存関係のインストール

```
npm install
```

## 開発

```
npm run dev
```

# デプロイ

`.env` に次に値を指定

```
S3_BUCKET_NAME=kado-album-client
CLOUDFRONT_DISTRIBUTION_ID=E3K3ZIMCTFSRLW
```
