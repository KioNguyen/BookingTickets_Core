import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { METHODS } from 'http';
import mongoose, { Document, Types } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema({ versionKey: false, timestamps: true })
export class Ticket extends mongoose.Schema {
  @Prop({ required: true })
  event: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number = 0;

  @Prop({ required: true })
  total_quantity: number = 0;

  @Prop()
  available_quantity: number = 0;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
