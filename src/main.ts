import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configs/app.config';
import { CFG } from './configs/constants';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaConfig } from './configs/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appCfg = configService.get<AppConfig>(CFG.APP);
  const kafkaCfg = configService.get<KafkaConfig>(CFG.KAFKA);

  if (!appCfg) {
    Logger.error('Application configuration not found');
    throw new Error('Application configuration not found');
  }

  if (!kafkaCfg) {
    Logger.error('Kafka configuration not found');
    throw new Error('Kafka configuration not found');
  }

  const { appName, appPort, hostName } = appCfg;
  const { broker } = kafkaCfg;

  console.log({ broker });

  // Setup Kafka microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: broker,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(appPort);

  Logger.log(`🚀 ${appName} is running on: http://${hostName}:${appPort}`);
}
bootstrap();
