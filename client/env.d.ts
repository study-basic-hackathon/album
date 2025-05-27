/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // 他にも必要ならここに追加
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
