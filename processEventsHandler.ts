import { Logger } from '@nestjs/common';

import type { INestApplication } from '@nestjs/common';

export function handleProcessEvents(app: INestApplication): void {
  // handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    Logger.error('Uncaught Exception', error);
    process.exit(1);
  });

  // handle unhandled promise rejections
  process.on('unhandledRejection', (error) => {
    Logger.error('Unhandled Rejection', error);
    process.exit(1);
  });

  // handle SIGTERM
  process.on('SIGTERM', () => {
    Logger.warn('Received SIGTERM, shutting down gracefully');
    app.close().then(() => {
      Logger.log('Application terminated');
      process.exit(0);
    });
  });

  // handle SIGINT
  process.on('SIGINT', () => {
    Logger.warn('Received SIGINT, shutting down gracefully');
    app.close().then(() => {
      Logger.log('Application terminated');
      process.exit(0);
    });
  });

  // handle SIGQUIT
  process.on('SIGQUIT', () => {
    Logger.warn('Received SIGQUIT, shutting down gracefully');
    app.close().then(() => {
      Logger.log('Application terminated');
      process.exit(0);
    });
  });

  // handle SIGBREAK
  process.on('SIGBREAK', () => {
    Logger.warn('Received SIGBREAK, shutting down gracefully');
    app.close().then(() => {
      Logger.log('Application terminated');
      process.exit(0);
    });
  });

  // handle SIGUSR2
  process.on('SIGUSR2', () => {
    Logger.warn('Received SIGUSR2, shutting down gracefully');
    app.close().then(() => {
      Logger.log('Application terminated');
      process.exit(0);
    });
  });

  // handle SIGUSR1
  process.on('SIGUSR1', () => {
    Logger.warn('Received SIGUSR1, shutting down gracefully');
    app.close().then(() => {
      Logger.log('Application terminated');
      process.exit(0);
    });
  });
}
