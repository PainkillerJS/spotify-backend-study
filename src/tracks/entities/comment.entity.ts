import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Track } from './track.entity';

interface CommentConstructor {
  username: string;
  text: string;
  track: Track;
}

@Entity()
export class Comment {
  constructor({ username, text, track }: CommentConstructor) {
    this.username = username;
    this.text = text;
    this.track = track;
  }

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  text: string;

  @Column((type) => Track)
  track: Track;
}
