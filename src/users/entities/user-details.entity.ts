import { Types } from "mongoose";

export interface IDetailUser {
    id: Types.ObjectId;
    fullname: string;
    email: string;
    phone: string;
    role: number;
    status: number;
}
