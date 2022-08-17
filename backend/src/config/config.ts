import { ConfigModuleOptions } from '@nestjs/config';
import { validateConfig } from './validate.config';

export const config: ConfigModuleOptions = {
  isGlobal: true,
  validate: validateConfig,
};
