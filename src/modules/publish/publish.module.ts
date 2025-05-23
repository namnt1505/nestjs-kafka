import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { kafkaClientAsyncOptions } from '../kafka-client/kafka-client.factory';
import { PublishController } from "./publish.controller";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        ...kafkaClientAsyncOptions('publisher', 'publisher-consumer'),
      },
    ]),
  ],
  controllers: [PublishController],
  providers: [],
})
export class PublishModule { }