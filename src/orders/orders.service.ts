import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { OrdersRepository } from './orders.repository';
import { OrderDocument } from './_schemas/order.schema';
import { CreateOrderDTO } from './dto/create-order.dto';
import { IDetailOrder } from './interface/order-details.interface';
import { TicketsService } from 'src/tickets/tickets.service';
import { EventsService } from 'src/events/events.service';
import * as Utils from '../utils/utils'
import { IDetailUser } from 'src/users/entities/user-details.entity';
import { UsersService } from 'src/users/users.service';
import { UserDocument } from 'src/users/_schemas/user.schema';
import { TicketDocument } from 'src/tickets/_schemas/ticket.schema';
import { IDetailTicket } from 'src/tickets/interface/ticket-details.interface';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly ticketsService: TicketsService,
    private readonly eventsService: EventsService,
    private userService: UsersService,
  ) { }

  _getOrderDetails(createOrderDTO: CreateOrderDTO): CreateOrderDTO {
    return createOrderDTO;
  }

  async createOrder(orderInfor: CreateOrderDTO): Promise<CreateOrderDTO> {
    Utils.idValidObjectId(orderInfor.owner);
    Utils.idValidObjectId(orderInfor.event);
    Utils.idValidObjectId(orderInfor.ticket);
    const ticket = await this.ticketsService.findTicketById(orderInfor.ticket);
    if (ticket.available_quantity < orderInfor.quantity || ticket.available_quantity <= 0) {
      throw new HttpException(`Ticket with id ${orderInfor.ticket} isn't enough quantity`, HttpStatus.FORBIDDEN);
    }
    const event = await this.eventsService.findEventById(orderInfor.event);
    if (!Utils.isPublishedEvent(event.start_date, event.end_date)) {
      throw new HttpException(`Event with id ${orderInfor.event} is out of day`, HttpStatus.FORBIDDEN);
    }
    const order = await this.ordersRepository.createOne(orderInfor);
    if (order) {
      await this.ticketsService.updateTicketQuantity(orderInfor.ticket);
    }


    return order;
  }

  async updateOrder(id: Types.ObjectId, orderInfor: CreateOrderDTO): Promise<CreateOrderDTO> {
    // orderInfor.published = Utils.isPublishedOrder(orderInfor.end_date);
    // Utils.isValidDateOrder(orderInfor.start_date, orderInfor.end_date);

    const order = await this.ordersRepository.findOneAndUpdate(id, orderInfor);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async getAllOrders(filter): Promise<any[]> {
    const orders = await this.ordersRepository.getAll(filter);
    const resp = []
    for await (const order of orders) {
      let user = await this.userService.findUserByIdDetail(<Types.ObjectId>order.owner)
      if (user) {
        user = await this.userService._getUserDetails(<UserDocument>user)
        order.owner = <IDetailUser>user;
      }
      let ticket = await this.ticketsService.findTicketById(<Types.ObjectId>order.ticket)
      if (ticket) {
        ticket = await this.ticketsService._getTicketDetails(<TicketDocument>ticket)
        order.ticket = <IDetailTicket>ticket;
      }
      resp.push(order)
    }
    return resp;
  }

  async removeOrder(_id: Types.ObjectId): Promise<any> {
    const order = await this.ordersRepository.findById(_id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return await this.ordersRepository.removeUser(_id);
  }

  async findOrderBySlug(email: string): Promise<OrderDocument> {
    const order = this.ordersRepository.findOne(email);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }


  async getOrder(_id: Types.ObjectId): Promise<IDetailOrder> {
    const order = await this.findOrderById(_id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findOrderById(_id: Types.ObjectId): Promise<IDetailOrder> {
    const order = await this.ordersRepository.findById(_id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}
