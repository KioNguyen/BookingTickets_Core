import { Types } from "mongoose";

export interface IDetailOrder {
    id?: Types.ObjectId;
    owner: Types.ObjectId;
    event: Types.ObjectId;
    ticket: Types.ObjectId;
    purchase_date: Types.ObjectId;
    total_price: number;
    status: number;
}
