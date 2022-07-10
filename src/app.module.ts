import { Module } from '@nestjs/common';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [TracksModule, AlbumsModule],
})
export class AppModule {}
