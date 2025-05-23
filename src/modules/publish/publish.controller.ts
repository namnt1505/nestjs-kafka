import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka, Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';

@Controller('publish')
export class PublishController {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka) { }

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('publish');
    this.kafkaClient.connect();
  }


  @Post('message')
  async publishMessage(@Body() message: any) {
    return this.kafkaClient.emit('publish', { message: message });
  }
}