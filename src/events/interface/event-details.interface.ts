import mongoose from "mongoose";

export interface IDetailEvent {
    id?: string;
    slug: string;
    name: string;
    description: string;
    poster: string;
    start_date: string;
    end_date: string;
    published: boolean;
}
