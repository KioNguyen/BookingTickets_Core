import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';


export const idValidObjectId = (id: Types.ObjectId): boolean => {
    if (!isValidObjectId(id)) {
        throw new HttpException("Invalid ObjectId", HttpStatus.BAD_REQUEST);
    }
    return true;
}

export const isPublishedEvent = (end_date: string): boolean => {
    const sNowTime = new Date().getTime();
    const sEndTime = new Date(end_date).getTime();
    return sEndTime - sNowTime >= 0;
}

export const isValidDateEvent = (start_date: string, end_date: string): boolean => {
    const sStartTime = new Date(start_date).getTime();
    const sEndTime = new Date(end_date).getTime();
    if (sEndTime - sStartTime < 0) {
        throw new HttpException("Start date must be before end date", HttpStatus.BAD_REQUEST)
    }
    return true;
}


