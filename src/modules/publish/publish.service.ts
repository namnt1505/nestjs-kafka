import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PublishService {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) { }

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('test-topic');
    this.kafkaClient.connect();
  }

  async publishMessage(message: any) {
    return this.kafkaClient.emit('test-topic', message);
  }
}