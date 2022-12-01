import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { IDetailTicket } from './interface/ticket-details.interface';
import { TicketDocument } from './_schemas/ticket.schema';


export class TicketsRepository {
  constructor(
    @InjectModel('Ticket')
    private ticketModel: Model<TicketDocument>,
  ) { }

  async createOne(ticket: CreateTicketDTO): Promise<IDetailTicket> {
    try {
      const newTicket = await this.ticketModel.create(ticket);
      return newTicket;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }


  async findById(_id: Types.ObjectId): Promise<any> {
    const result = this.ticketModel.findById(_id);
    return result;
  }


  async removeUser(id: Types.ObjectId): Promise<{ acknowledged: boolean, deletedCount: number }> {
    const result = await this.ticketModel.deleteOne({ _id: id });
    return result;
  }

  async getAll(): Promise<TicketDocument[]> {
    const result = await this.ticketModel.find({});
    return result;
  }

  async findOne(email: string): Promise<any> {
    const result = await this.ticketModel.findOne({ email: email });
    return result;
  }
  async findOneAndUpdate(id: Types.ObjectId, ticketInfor: IDetailTicket): Promise<IDetailTicket> {

    try {
      const result = await this.ticketModel.findByIdAndUpdate(id, ticketInfor, { new: true });
      return result;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN);
    }
  }

  async updateMany(conditions: any, set: any) {
    const result = await this.updateMany(conditions, set);
    return result;
  }

  async getWithConditions(filter: any): Promise<TicketDocument[]> {
    const result = await this.ticketModel.find(filter);
    return result;
  }
}
