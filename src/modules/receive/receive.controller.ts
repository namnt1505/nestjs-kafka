import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ReceiveController {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka) { }

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('receiver');
    this.kafkaClient.connect();
  }

  @MessagePattern('publish')
  async handleMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    console.log('Received message in controller:', message);
    return this.kafkaClient.emit('receiver', 'Recived message in controller');
  }
}