import { Inject, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CFG } from "src/configs/constants";
import { KafkaConfig } from "src/configs/kafka.config";
import { PublishController } from "./publish.controller";
import { PublishService } from "./publish.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: (configService: ConfigService) => {
          const config = configService.get<KafkaConfig>(CFG.KAFKA);
          if (!config) {
            throw new Error('Kafka config is not defined');
          }
          const { broker } = config;

          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'nest-kafka-publisher',
                brokers: broker,
              },
              producer: {
                allowAutoTopicCreation: true,
                idempotent: true,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PublishController],
  providers: [PublishService],
})
export class PublishModule { }