/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD_ENV: 'development' | 'devcloud' | 'staging' | 'production' | undefined;
  // Add other VITE_ prefixed environment variables here if you have them
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 