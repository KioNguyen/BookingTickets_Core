import { Types } from "mongoose";

export interface ILoginDetail {
    id: Types.ObjectId;
    fullname: string;
    email: string;
    phone: string;
    role: number;
    status: number; //0: disabled, 1: active
    apiToken: string;
}
