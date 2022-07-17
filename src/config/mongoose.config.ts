import type { ConfigService } from '@nestjs/config';
import type { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

const mongooseConfig = (
  configService: ConfigService,
): MongooseModuleFactoryOptions => ({
  uri: configService.get<string>('MONGO_URL'),
});

export default mongooseConfig;
