import { Body, Controller, Post } from '@nestjs/common';
import { PublishService } from './publish.service';

@Controller('publish')
export class PublishController {
  constructor(private readonly publishService: PublishService) { }

  @Post('message')
  async publishMessage(@Body() message: any) {
    return this.publishService.publishMessage(message);
  }
}