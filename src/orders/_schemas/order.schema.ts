import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { METHODS } from 'http';
import mongoose, { Document, Types } from 'mongoose';
import { IDetailUser } from 'src/users/entities/user-details.entity';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false, timestamps: true })
export class Order extends mongoose.Schema {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
  owner?: Types.ObjectId | IDetailUser;

  @Prop({ required: true })
  event: Types.ObjectId;

  @Prop({ required: true })
  ticket: Types.ObjectId;

  @Prop()
  purchase_date: string;

  @Prop()
  total_price: number = 0;

  @Prop({ required: true, min: 1 })
  quantity: number = 0;

  @Prop()
  status: number = 0;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
