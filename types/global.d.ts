declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      PORT: string;
      HOST_NAME: string;
    }
  }
}

export { };
