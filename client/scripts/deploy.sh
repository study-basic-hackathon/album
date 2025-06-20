#!/bin/bash

# .env の読み込み
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found"
  exit 1
fi

# プロファイルオプションの処理
PROFILE_OPTION=""
if [[ "$1" == "--profile" && -n "$2" ]]; then
  PROFILE_OPTION="--profile $2"
  shift 2
fi

# 依存のインストール
echo "Running: npm install"
npm install

# ビルド（Vite）
echo "Running: npm run build"
npm run build

# S3 にアップロード
echo "Uploading to S3 bucket: $S3_BUCKET_NAME"
aws s3 sync ./dist "s3://$S3_BUCKET_NAME" --delete $PROFILE_OPTION

# CloudFront キャッシュ無効化
echo "Invalidating CloudFront cache: $CLOUDFRONT_DISTRIBUTION_ID"
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*" \
  $PROFILE_OPTION
