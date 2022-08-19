import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import User from 'src/users/entities/user.entity';
import { AuthController } from './auth.controller';

import { KakaoStrategy } from 'src/auth/strategy/kakao.strategy';
import { GoogleStrategy } from 'src/auth/strategy/google.strategy';
import { GithubStrategy } from 'src/auth/strategy/github.strategy';

@Module({
  imports: [TypeOrmModule, TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, JwtService, AuthService],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtService,
    KakaoStrategy,
    GoogleStrategy,
    GithubStrategy,
  ],
})
export class AuthModule {}
