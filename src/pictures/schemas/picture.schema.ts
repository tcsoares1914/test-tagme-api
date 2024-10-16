import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PictureDocument = HydratedDocument<Picture>;

@Schema({
  collection: 'pictures',
  timestamps: true,
})
export class Picture {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  photo: string;

  @Prop()
  created!: Date;

  @Prop()
  updated!: Date;

  constructor(picture?: Partial<Picture>) {
    this.title = picture?.title;
    this.description = picture?.description;
    this.photo = picture?.photo;
  }
}

export const PictureSchema = SchemaFactory.createForClass(Picture);
