export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CUSTOM_ENV: 'stage' | 'prod' | 'prestage';
      NEXT_PUBLIC_WORKING_DOMAIN:
        | 'ifiniti.xyz'
        | 'ifiniti.co'
        | 'stage.ifiniti.xyz';
    }
  }
}
