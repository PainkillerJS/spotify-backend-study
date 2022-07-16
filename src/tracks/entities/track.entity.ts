import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { Comment } from './comment.entity';

interface TrackConstructor {
  name: string;
  artist: string;
  track: string;
  listens: string;
  audio: string;
  picture?: string;
  comments?: Comment[];
}

@Entity()
export class Track {
  constructor({
    name,
    artist,
    track,
    listens,
    audio,
    comments,
    picture,
  }: TrackConstructor) {
    this.name = name;
    this.artist = artist;
    this.track = track;
    this.listens = listens;
    this.audio = audio;
    this.comments = comments;
    this.picture = picture;
  }

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column()
  track: string;

  @Column()
  listens: string;

  @Column()
  picture: string;

  @Column()
  audio: string;

  @Column((type) => Comment)
  comments: Comment[];
}
