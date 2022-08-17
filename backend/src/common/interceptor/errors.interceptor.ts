import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorException } from '../exception/error.exception';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((err) =>
          throwError(() =>
            err instanceof ErrorException
              ? err
              : new ErrorException(
                  '서버 에러 발생',
                  HttpStatus.INTERNAL_SERVER_ERROR,
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
          ),
        ),
      );
  }
}
