import { Module } from '@nestjs/common';
import { ReceiveController } from './receive.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConfig } from 'src/configs/kafka.config';
import { CFG } from 'src/configs/constants';
import { ReceiveService } from './receive.service';

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
                clientId: 'nest-kafka-receiver',
                brokers: broker,
              },
              consumer: {
                groupId: 'nest-receiver-consumer',
                allowAutoTopicCreation: true
              }
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReceiveController],
  providers: [ReceiveService],
})
export class ReceiveModule { }