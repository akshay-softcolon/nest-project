import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { configureApp } from 'appConfig';
import { handleProcessEvents } from 'processEventsHandler';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app configuration
  configureApp(app);

  // exception handling
  handleProcessEvents(app);  

  await app.listen(3000, () => {
    Logger.log('Server is running on http://localhost:3000');
  });
}
bootstrap();