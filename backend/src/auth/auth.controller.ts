import { Request, Response } from 'express';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { OAuthProviderEnum } from 'src/common/enum/oauth-provider.enum';
import { DAY_SECONDS, MINUTE_SECONDS } from 'src/common/constant/time';

interface IAuth {
  provider: OAuthProviderEnum;
  snsId: string;
}

interface IReqUser {
  user: IAuth;
}

const CLIENT_URL = 'http://localhost:3000';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  setAccessToken(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', `Bearer ${accessToken}`, {
      httpOnly: true,
      maxAge: 30 * MINUTE_SECONDS,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * DAY_SECONDS,
    });
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  loginKakao() {}

  @Get('/login/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async loginKakaoCallback(
    @Req() req: Request & IReqUser,
    @Res() res: Response,
  ) {
    const { provider, snsId } = req.user;
    const { accessToken, refreshToken } = await this.authService.login(
      provider,
      snsId,
    );

    this.setAccessToken(res, accessToken, refreshToken);
    res.redirect(CLIENT_URL);
  }

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  loginGoogle() {}

  @Get('/login/google/callback')
  @UseGuards(AuthGuard('google'))
  async loginGoogleCallback(
    @Req() req: Request & IReqUser,
    @Res() res: Response,
  ) {
    const { provider, snsId } = req.user;
    const { accessToken, refreshToken } = await this.authService.login(
      provider,
      snsId,
    );

    this.setAccessToken(res, accessToken, refreshToken);
    res.redirect(CLIENT_URL);
  }

  @Get('/login/github')
  @UseGuards(AuthGuard('github'))
  loginGithub() {}

  @Get('/login/github/callback')
  @UseGuards(AuthGuard('github'))
  async loginGithubCallback(
    @Req() req: Request & IReqUser,
    @Res() res: Response,
  ) {
    const { provider, snsId } = req.user;
    const { accessToken, refreshToken } = await this.authService.login(
      provider,
      snsId,
    );

    this.setAccessToken(res, accessToken, refreshToken);
    res.redirect(CLIENT_URL);
  }
}
