/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string
  readonly VITE_SHEETS_WEBAPP_URL?: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
