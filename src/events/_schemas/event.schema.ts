import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { METHODS } from 'http';
import mongoose, { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ versionKey: false, timestamps: true })
export class Event extends mongoose.Schema {
  @Prop({ required: true, index: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  poster: string;

  @Prop({ required: true })
  start_date: string;

  @Prop({ required: true })
  end_date: string;

  @Prop()
  published: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
