import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorException extends HttpException {
  constructor(message: string, code: number, status: HttpStatus) {
    super(
      {
        message,
        code,
        timestamp: new Date().toLocaleString(),
      },
      status,
    );
  }
}
