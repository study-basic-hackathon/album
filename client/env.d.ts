/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_MOCK_SERVER_ENABELD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
