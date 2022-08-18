import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import User from 'src/users/entities/user.entity';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { AuthController } from './auth.controller';
import { NaverStrategy } from './strategy/naver.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule, TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtService,
    KakaoStrategy,
    NaverStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
