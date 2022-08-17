import { Module } from '@nestjs/common';
import { MySqlConfigService } from './mysql-config.service';

@Module({
  providers: [MySqlConfigService],
})
export class MySqlConfigModule {}
