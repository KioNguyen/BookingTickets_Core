import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';


export const idValidObjectId = (id: Types.ObjectId) => {
    if (!isValidObjectId(id)) {
        throw new HttpException("Invalid ObjectId", HttpStatus.BAD_REQUEST)
    }
}

export const isPublishedEvent = (end_date: string): boolean => {
    const sNowTime = new Date().getTime();
    const sEndTime = new Date(end_date).getTime();
    return sEndTime - sNowTime >= 0;
}
export const isValidDateEvent = (start_date: string, end_date: string): boolean => {
    const sStartTime = new Date(start_date).getTime();
    const sEndTime = new Date(end_date).getTime();
    return sEndTime - sStartTime >= 0;
}


