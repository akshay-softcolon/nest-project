import { Injectable, Logger } from '@nestjs/common';
import * as messages from '../messages';
import { ERes } from 'src/types/express.types';

@Injectable()
export class ResponseService {
  private readonly logger = new Logger(ResponseService.name);

  async error(req: any, res: any, msg: any, statusCode = 500, language = 'en') {
    console.log('message--->>.', msg, statusCode, language);

    const response = {
      code: 0,
      status: 'FAIL',
      message: this.getMessage(msg, language)
        ? this.getMessage(msg, language)
        : msg,
    };

    if (msg == 'TOKEN_MALFORMED' || msg == 'TOKEN_NOT_PRESENT') {
      statusCode = 403;
    }

    if (
      msg == 'EMAIL_NOT_EXIST' ||
      msg == 'EMAIL_EXISTS' ||
      msg == 'INVALID_EMAIL' ||
      msg == 'EMAIL_NOT_VERIFIED' ||
      msg == 'INVALID_PASSWORD'|| msg == 'INVALID_OLD_PASSWORD'||
      msg == 'TOKEN_REQUIRED'
    ) {
      statusCode = 400;
    }
    if (msg == 'USER_NOT_FOUND') {
      statusCode = 404;
    }
    if (msg == 'INTERNAL_SERVER_ERROR') {
      statusCode = 500;
    }
    if (msg == 'RECORD_NOT_FOUND') {
      statusCode = 404;
    }
    if (msg == 'USER_BANNED') {
      statusCode = 406;
    }
    if (msg == 'USER_DEACTIVED') {
      statusCode = 403;
    }
    if (msg == 'USER_BLOCKED') {
      statusCode = 406;
    }
    if (msg == 'USER_DELETED') {
      statusCode = 405;
    }
    if (msg == 'RESTAURANT_DEACTIVED_BY_ADMIN') {
      statusCode = 403;
    }
    if (msg == 'ACCOUNT_DELETED') {
      statusCode = 405;
    }
    if (msg == 'INVALID_APP_VERSION' || msg == 'CURRENT_APP_VERSION_EXPIRED') {
      statusCode = 426;
    }
    if (msg == 'jwt expired' || msg == 'TOKEN_EXPIRED') {
      statusCode = 401;
    }
    if (response.code == 500) {
      response.message = 'Internal server error';
    }
    if (statusCode == 22001) {
      console.log('checking:::$$$');

      response.code = 0; // or any other appropriate status code
      statusCode = 400; // or any other appropriate status code
    }

    const d = new Date();
    const formatted_date = `${d.getFullYear()}-${
      d.getMonth() + 1
    }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    msg = typeof msg == 'object' ? JSON.stringify(msg) : msg;
    this.logger.error(
      `[${formatted_date}] ${req.method}:${req.originalUrl} ${msg}`,
    );

    res.status(statusCode).json(response);
  }

  async success(
    res: ERes,
    msg: string,
    data: object,
    statusCode = 200,
    language = 'en',
  ) {
    try {
    //   if (typeof msg === 'string') {
    //     msg = await this.getMessage(msg, language);
    //   }
      const response = {
        code: 1,
        status: 'SUCCESS',
        message: msg,
        data: data /* ? data : {} */,
      };

      res.status(statusCode).json(response);
    } catch (error) {
      console.log(`\nsuccess error ->> `, error);
      return;
    }
  }

  getMessage(msg: string, language: string) {
    console.log('msgg', msg, language);

    const lang = language ? language : 'en';
    return messages[lang][msg];
  }

  socketError(msg: any, language: string = 'en'): any {
    let message = this.getMessage(msg, language) ? this.getMessage(msg, language) : msg;

    if (msg === 'INTERNAL_SERVER_ERROR') {
      message = 'Internal server error';
    }

    const d = new Date();
    const formatted_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    const logMessage = typeof msg === 'object' ? JSON.stringify(msg) : msg;
    this.logger.error(`[${formatted_date}] Socket Error: ${logMessage}`);

    return {
      code: 0,
      status: 'FAIL',
      message,
    };
  }
}
