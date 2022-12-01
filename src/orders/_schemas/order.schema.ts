import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { METHODS } from 'http';
import mongoose, { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false, timestamps: true })
export class Order extends mongoose.Schema {
  @Prop({ required: true })
  owner: Types.ObjectId;

  @Prop({ required: true })
  event: Types.ObjectId;

  @Prop({ required: true })
  ticket: Types.ObjectId;

  @Prop()
  purchase_date: string;

  @Prop()
  total_price: number;

  @Prop()
  status: number = 0;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
