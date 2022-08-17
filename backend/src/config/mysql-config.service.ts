import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MySqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      port: +this.configService.get('DATABASE_PORT'),
      host: this.configService.get('DATABASE_HOST'),
      database: this.configService.get('DATABASE_NAME'),
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: true,
    };
  }
}
