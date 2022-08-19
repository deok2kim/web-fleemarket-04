import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorException } from '../exception/error.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: ErrorException | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    if (exception instanceof ErrorException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'INTERNAL SERVER ERROR';

    response.status(status).json({
      message,
      code: status,
      timestamp: new Date().toLocaleString(),
    });
  }
}
