import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ReceiveService } from './receive.service';

@Controller()
export class ReceiveController {
  constructor(private readonly receiveService: ReceiveService) { }

  @EventPattern('test-topic')
  async handleMessage(@Payload() message: any) {
    console.log('Received message in controller:', message);
    return this.receiveService.handleMessage(message);
  }
}