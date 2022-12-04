import { Types } from "mongoose";
import { IDetailTicket } from "src/tickets/interface/ticket-details.interface";
import { IDetailUser } from "../../users/entities/user-details.entity"

export interface IDetailOrderWithUser {
    id?: Types.ObjectId;
    owner: IDetailUser | Types.ObjectId;
    event: Types.ObjectId;
    ticket: IDetailTicket | Types.ObjectId;
    purchase_date: string;
    total_price: number;
    quantity: number;
    status: number;
}
