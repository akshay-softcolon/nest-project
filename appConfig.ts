import {INestApplication, ValidationPipe } from '@nestjs/common';
import { json } from 'express';

import { blue, cyan, magenta, red, yellow } from 'colorette';

export function configureApp(app: INestApplication): void {
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  app.use(json({ limit: '15mb' }));

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useLogger({
    log: (message) =>
      // eslint-disable-next-line no-console
      console.log(blue(`[LOG] ${new Date().toISOString()} - ${message}`)),
    error: (message) =>
      // eslint-disable-next-line no-console
      console.error(red(`[ERROR] ${new Date().toISOString()} - ${message}`)),
    warn: (message) =>
      // eslint-disable-next-line no-console
      console.warn(yellow(`[WARN] ${new Date().toISOString()} - ${message}`)),
    debug: (message) =>
      // eslint-disable-next-line no-console
      console.debug(
        magenta(`[DEBUG] ${new Date().toISOString()} - ${message}`),
      ),
    verbose: (message) =>
      // eslint-disable-next-line no-console
      console.log(cyan(`[VERBOSE] ${new Date().toISOString()} - ${message}`)),
    fatal(message, ...optionalParams) {
      // eslint-disable-next-line no-console
      console.error(
        red(`[FATAL] ${new Date().toISOString()} - ${message}`),
        optionalParams,
      );
      process.exit(1);
    },
  });

  // handle path not found
  // app.use((req: Request, res: Response) => {
  //   console.log(red(`[404] ${req.method} ${req.url}`));
  //   res.status(404).json({
  //     statusCode: 404,
  //     message: 'Path not found',
  //   });
  // }); 
 
  // Start the application
  app.enableShutdownHooks();
}
