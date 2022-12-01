import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { EventsRepository } from './events.repository';
import { EventDocument } from './_schemas/event.schema';
import { CreateEventDTO } from './dto/create-event.dto';
import { IDetailEvent } from './interface/event-details.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as Utils from './../utils/utils'

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) { }

  _getEventDetails({ id, slug, name, description, poster, start_date, end_date, published }: IDetailEvent): IDetailEvent {
    return { id, slug, name, description, poster, start_date, end_date, published };
  }

  async createEvent(eventInfor: CreateEventDTO): Promise<IDetailEvent> {
    eventInfor.published = Utils.isPublishedEvent(eventInfor.end_date);
    Utils.isValidDateEvent(eventInfor.start_date, eventInfor.end_date);
    const event = await this.eventsRepository.createOne(eventInfor);
    return event;
  }

  async updateEvent(id: Types.ObjectId, eventInfor: IDetailEvent): Promise<IDetailEvent> {
    eventInfor.published = Utils.isPublishedEvent(eventInfor.end_date);
    Utils.isValidDateEvent(eventInfor.start_date, eventInfor.end_date);
    const event = await this.eventsRepository.findOneAndUpdate(id, eventInfor);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async getAllEvents(): Promise<EventDocument[]> {
    const events = await this.eventsRepository.getAll();
    return events;
  }

  async removeEvent(_id: Types.ObjectId): Promise<any> {
    const event = await this.eventsRepository.findById(_id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return await this.eventsRepository.removeUser(_id);
  }

  async findEventBySlug(email: string): Promise<EventDocument> {
    const event = await this.eventsRepository.findOne(email);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }


  async getEvent(_id: Types.ObjectId): Promise<EventDocument> {
    const event = await this.findEventById(_id);
    if (!event) {
      throw new NotFoundException('User not found');
    }
    return event;
  }

  async findEventById(_id: Types.ObjectId): Promise<EventDocument> {
    const event = await this.eventsRepository.findById(_id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  updatePublishAllEvent() {
    const nowDate = new Date().toISOString();
    this.eventsRepository.updateMany({ end_date: { $lt: nowDate } }, { published: false });
    this.eventsRepository.updateMany({ start_date: { $lt: nowDate, end_date: { $lt: nowDate } } }, { published: true });
  }
}
