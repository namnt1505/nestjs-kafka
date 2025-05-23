import { ConfigService } from '@nestjs/config';
import { KafkaConfig } from 'src/configs/kafka.config';
import { CFG } from 'src/configs/constants';
import { Transport, KafkaOptions } from '@nestjs/microservices';

export function kafkaClientAsyncOptions(clientId: string, groupId: string) {
  return {
    useFactory: (configService: ConfigService): KafkaOptions => {
      const config = configService.get<KafkaConfig>(CFG.KAFKA);
      if (!config) {
        throw new Error('Kafka config is not defined');
      }
      const { broker } = config;
      return {
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId,
            brokers: broker,
          },
          consumer: {
            groupId,
            allowAutoTopicCreation: true,
          },
        },
      };
    },
    inject: [ConfigService],
  };
}
