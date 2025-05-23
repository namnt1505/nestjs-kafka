import { Module } from '@nestjs/common';
import { ReceiveController } from './receive.controller';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaClientAsyncOptions } from '../kafka-client/kafka-client.factory';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        ...kafkaClientAsyncOptions('receiver', 'receiver-consumer'),
      },
    ]),
  ],
  controllers: [ReceiveController],
  providers: [],
})
export class ReceiveModule { }