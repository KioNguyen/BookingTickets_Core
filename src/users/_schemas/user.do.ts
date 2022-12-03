import { Types } from 'mongoose';

export class UserDo {
  _id: Types.ObjectId;
  email: string;
  phone: string;
  password: string;
  fullname: string;
  role: number;
  status: number;

  constructor(props: Partial<UserDo>) {
    this._id = props._id;
    this.email = props.email || null;
    this.phone = props.phone || null;
    this.password = props.password || null;
    this.fullname = props.fullname || null;
    this.role = props.role || null;
    this.status = props.status || null;
  }


}
