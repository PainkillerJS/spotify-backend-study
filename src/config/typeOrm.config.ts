import type { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { join } from 'path';

const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mongodb',
  url: configService.get<string>('MONGO'),
  synchronize: true,
  entities: [join(__dirname, '**', '*.entity.ts')],
  useNewUrlParser: true,
  logging: true,
});

export default typeOrmConfig;
