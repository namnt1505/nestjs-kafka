import { registerAs } from "@nestjs/config";
import { CFG } from "./constants";

export interface AppConfig {
  appName: string;
  appPort: string;
  hostName: string;
}

export default registerAs(CFG.APP, (): AppConfig => ({
  appName: process.env.APP_NAME || "NestJS App",
  appPort: process.env.PORT || "3000",
  hostName: process.env.HOST_NAME || "localhost",
}));