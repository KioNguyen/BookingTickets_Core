import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { OrdersRepository } from './orders.repository';
import { OrderDocument } from './_schemas/order.schema';
import { CreateOrderDTO } from './dto/create-order.dto';
import { IDetailOrder } from './interface/order-details.interface';
import { TicketsService } from 'src/tickets/tickets.service';
import { EventsService } from 'src/events/events.service';
import * as Utils from '../utils/utils'

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly ticketsService: TicketsService,
    private readonly eventsService: EventsService
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

  async getAllOrders(): Promise<OrderDocument[]> {
    const orders = await this.ordersRepository.getAll();
    return orders;
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


  async getOrder(_id: Types.ObjectId): Promise<OrderDocument> {
    const order = await this.findOrderById(_id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findOrderById(_id: Types.ObjectId): Promise<OrderDocument> {
    const order = await this.ordersRepository.findById(_id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}
