import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs';
import { PublishModule } from './modules/publish/publish.module';
import { ReceiveModule } from './modules/receive/receive.module';

const { NODE_ENV } = process.env;
const envPath = NODE_ENV ? `.env.${NODE_ENV}.yml` : `.env.yml`;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configuration,
      isGlobal: true,
      envFilePath: envPath,
    }),
    PublishModule,
    ReceiveModule,
  ],
})
export class AppModule { }
