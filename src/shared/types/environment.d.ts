export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CUSTOM_ENV: 'stage' | 'prod' | 'prestage';
      NEXT_PUBLIC_APP_VERSION: string;
    }
  }
}
