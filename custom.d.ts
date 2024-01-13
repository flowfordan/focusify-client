declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.jpg' {
  const value: string;
  export = value;
}
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
  export default content;
}

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CUSTOM_ENV: 'stage' | 'prod' | 'prestage';
      NEXT_PUBLIC_APP_VERSION: string;
    }
  }
}

declare module '*.mp3' {
  const content: string;
  export default content;
}
