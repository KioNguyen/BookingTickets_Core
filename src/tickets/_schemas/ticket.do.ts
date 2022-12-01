import { Types } from 'mongoose';

export class TicketDo {
  _id: Types.ObjectId;
  event: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  total_quantity: number;
  available_quantity: number;

  constructor(props: Partial<TicketDo>) {
    this._id = props._id;
    this.event = props.event || null;
    this.name = props.name || "";
    this.description = props.description || "";
    this.price = props.price || 0;
    this.total_quantity = props.total_quantity || 0;
    this.available_quantity = props.available_quantity || 0;
  }
}
