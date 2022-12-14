import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { ErrorException } from 'src/common/exception/error.exception';
import { Request } from 'express';
import { ERROR_MESSAGE } from 'src/common/constant/error-message';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (!authorization) {
      throw new ErrorException(
        ERROR_MESSAGE.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authorization.replace('Bearer ', '');
    const { id } = await this.authService.validateToken(token);
    const user = await this.userService.findUserById(id);

    request.user = user;
    return true;
  }
  catch(error) {
    switch (error.message) {
      case 'invalid token':
        throw new ErrorException(
          ERROR_MESSAGE.INVALID_TOKEN,
          HttpStatus.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
        );

      case 'jwt expired':
        throw new ErrorException(
          ERROR_MESSAGE.EXPIRED_TOKEN,
          HttpStatus.GONE,
          HttpStatus.GONE,
        );

      default:
        throw new ErrorException(
          ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
