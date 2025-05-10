import { Injectable } from '@nestjs/common';

@Injectable()
export class ReceiveService {
  async handleMessage(message: any) {
    console.log('Processing message in service:', message);
    return message;
  }
}