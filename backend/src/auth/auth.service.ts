import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ERROR_MESSAGE } from 'src/common/constant/error-message';
import { OAuthProviderEnum } from 'src/common/enum/oauth-provider.enum';
import { ErrorException } from 'src/common/exception/error.exception';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { generateRandomNickname } from './util/auth.util';

const ACCESS_TOKEN_EXPIRED_TIME = '30m';
const REFRESH_TOKEN_EXPIRED_TIME = '7d';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    provider: OAuthProviderEnum,
    snsId: string,
  ): Promise<User> {
    return this.usersService.findUserBySnsIdAndProvider(provider, snsId);
  }

  createAccessToken(user: User) {
    const payload = {
      id: user.id,
      userToken: 'accessToken',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: ACCESS_TOKEN_EXPIRED_TIME,
    });
  }

  createRefreshToken(user: User) {
    const payload = {
      id: user.id,
      userToken: 'refreshToken',
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: REFRESH_TOKEN_EXPIRED_TIME,
    });

    return refreshToken;
  }

  async validateToken(
    token: string,
    isRefresh = false,
  ): Promise<{ id: number; userToken: string }> {
    return await this.jwtService.verify(token, {
      secret: isRefresh
        ? this.configService.get('JWT_REFRESH_SECRET')
        : this.configService.get('JWT_SECRET'),
    });
  }

  async refreshAccessToken(refreshToken: string) {
    const userPayload = await this.validateToken(refreshToken, true);

    if (!userPayload) {
      throw new ErrorException(
        ERROR_MESSAGE.INVALID_TOKEN,
        HttpStatus.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.usersService.findUserById(userPayload.id);

    const accessToken = this.createAccessToken(user);
    const newRefreshToken = this.createRefreshToken(user);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async login(provider: OAuthProviderEnum, snsId: string) {
    let user: User = await this.validateUser(provider, snsId);
    let nickname: string;

    if (!user) {
      while (true) {
        const randomNickname = generateRandomNickname();
        const exUser = await this.usersService.findUserByNickname(
          randomNickname,
        );

        if (!exUser) {
          nickname = randomNickname;
          break;
        }
      }

      user = await this.usersService.createUser({
        provider,
        snsId,
        nickname,
      });
    }

    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }
}
