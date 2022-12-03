import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { TicketsRepository } from './tickets.repository';
import { TicketDocument } from './_schemas/ticket.schema';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { IDetailTicket } from './interface/ticket-details.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as Utils from '../utils/utils'

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: TicketsRepository) { }

  _getTicketDetails({ id, event, name, description, price, total_quantity, available_quantity }: IDetailTicket): IDetailTicket {
    return { id, event, name, description, price, total_quantity, available_quantity };
  }

  async createTicket(ticketInfor: CreateTicketDTO): Promise<IDetailTicket> {
    Utils.idValidObjectId(ticketInfor.event);
    if (!ticketInfor.available_quantity) {
      ticketInfor.available_quantity = ticketInfor.total_quantity;
    }
    // ticketInfor.published = Utils.isPublishedTicket(ticketInfor.end_date);
    // Utils.isValidDateTicket(ticketInfor.start_date, ticketInfor.end_date);
    const ticket = await this.ticketsRepository.createOne(ticketInfor);
    return ticket;
  }

  async updateTicket(id: Types.ObjectId, ticketInfor: CreateTicketDTO): Promise<IDetailTicket> {
    // ticketInfor.published = Utils.isPublishedTicket(ticketInfor.end_date);
    // Utils.isValidDateTicket(ticketInfor.start_date, ticketInfor.end_date);
    const oldTicket = await this.ticketsRepository.findById(id);
    if (!oldTicket) {
      throw new NotFoundException('Ticket not found');
    }
    if (oldTicket.total_quantity !== ticketInfor.total_quantity) {
      ticketInfor.available_quantity = oldTicket.available_quantity + (ticketInfor.total_quantity - oldTicket.total_quantity)
    }
    const ticket = await this.ticketsRepository.findOneAndUpdate(id, ticketInfor);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async getAllTickets(): Promise<TicketDocument[]> {
    const tickets = await this.ticketsRepository.getAll();
    return tickets;
  }


  async getTicketsByEvent(id: Types.ObjectId): Promise<TicketDocument[]> {
    const tickets = await this.ticketsRepository.getWithConditions({ event: id });
    return tickets;
  }

  async removeTicket(_id: Types.ObjectId): Promise<any> {
    const ticket = await this.ticketsRepository.findById(_id);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return await this.ticketsRepository.removeUser(_id);
  }

  async findTicketBySlug(email: string): Promise<TicketDocument> {
    const ticket = this.ticketsRepository.findOne(email);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }


  async getTicket(_id: Types.ObjectId): Promise<TicketDocument> {
    const ticket = await this.findTicketById(_id);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async findTicketById(_id: Types.ObjectId): Promise<TicketDocument> {
    const ticket = await this.ticketsRepository.findById(_id);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async updateTicketQuantity(_id: Types.ObjectId): Promise<IDetailTicket> {
    const ticket = await this.ticketsRepository.findById(_id);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    --ticket.available_quantity;
    const ticketUpdated = await this.updateTicket(_id, ticket);
    return ticketUpdated;
  }


}
