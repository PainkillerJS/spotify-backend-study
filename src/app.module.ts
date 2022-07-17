import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";

import { resolve } from "path";

import mongooseConfig from "@config/mongoose.config";

import { TracksModule } from "./tracks/tracks.module";
import { FileModule } from "./file/file.module";

@Module({
  imports: [
    TracksModule,
    MongooseModule.forRootAsync({
      useFactory: mongooseConfig,
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
    ConfigModule.forRoot(),
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, "static")
    })
  ]
})
export class AppModule {}
