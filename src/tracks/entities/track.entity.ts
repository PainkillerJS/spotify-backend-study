import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import type { Document } from 'mongoose';
import { Types } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ unique: true })
  name: string;

  @Prop()
  artist: string;

  @Prop()
  track: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Array<Types.ObjectId>;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
