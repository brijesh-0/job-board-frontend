interface ImportMetaEnv {
  VITE_API_URL: string;
  [key: string]: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
