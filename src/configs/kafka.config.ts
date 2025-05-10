import { registerAs } from "@nestjs/config";
import { CFG } from "./constants";

export interface KafkaConfig {
  broker: string[];
}

export default registerAs(CFG.KAFKA, (): KafkaConfig => ({
  broker: process.env.KAFKA_BROKER?.split(',') || [],
}));