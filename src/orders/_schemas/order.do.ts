import { Types } from 'mongoose';

export class OrderDo {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  event: Types.ObjectId;
  ticket: Types.ObjectId;
  purchase_date: string;
  total_price: number;
  quantity: number;
  status: number;

  constructor(props: Partial<OrderDo>) {
    this._id = props._id;
    this.owner = props.owner || null;
    this.event = props.event || null;
    this.ticket = props.ticket || null;
    this.purchase_date = props.purchase_date || "";
    this.total_price = props.total_price || 0;
    this.quantity = props.quantity || 0;
    this.status = props.status || 0;
  }
}
