import { Types } from "mongoose";

export interface IDetailTicket {
    id?: Types.ObjectId;
    event: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    total_quantity: number;
    available_quantity: number;
}
