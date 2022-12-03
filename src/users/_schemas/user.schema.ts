import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { METHODS } from 'http';
import mongoose, { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User extends mongoose.Schema {
  @Prop({ required: true, index: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  fullname: string;

  @Prop()
  role: number; //0: admin_user; 1: normal_user

  @Prop()
  status: number; //0: disable; 1: active
}

export const UserSchema = SchemaFactory.createForClass(User);
