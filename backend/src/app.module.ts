import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import { ResponseTransformInterceptor } from './common/interceptor/response-transform.interceptor';
import { config } from './config/config';
import { MySqlConfigModule } from './config/mysql-config.module';
import { MySqlConfigService } from './config/mysql-config.service';
import { LoggerMiddleware } from './middleware/logger-middleware';
import { RegionsModule } from './regions/regions.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ImageModule } from './images/images.module';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', 'frontend', 'build'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
    ProductsModule,
    RegionsModule,
    AuthModule,
    UsersModule,
    ImageModule,
    ChatRoomsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
