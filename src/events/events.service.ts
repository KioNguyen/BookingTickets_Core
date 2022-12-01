import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { EventsRepository } from './events.repository';
import { EventDocument } from './_schemas/event.schema';
import { CreateEventDTO } from './dto/create-event.dto';
import { IDetailEvent } from './interface/event-details.interface';
import * as Utils from './../utils/utils'

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) { }


  _getEventDetails({ id, slug, name, description, poster, start_date, end_date, published }: EventDocument): IDetailEvent {
    return { id, slug, name, description, poster, start_date, end_date, published };
  }

  createEvent(eventInfor: CreateEventDTO): Promise<EventDocument> {
    eventInfor.published = Utils.isPublishedEvent(eventInfor.end_date);
    if (!Utils.isValidDateEvent(eventInfor.start_date, eventInfor.end_date)) {
      throw new Error('Start date must be before end date')
    }
    const event = this.eventsRepository.createOne(eventInfor);
    return event;
  }

  async getAllEvents(): Promise<EventDocument[]> {
    const events = await this.eventsRepository.getAll();
    return events;
  }

  async removeEvent(_id: Types.ObjectId): Promise<any> {
    const event = this.eventsRepository.findUserById(_id);
    if (!event) {
      throw new NotFoundException('User not found');
    }
    return await this.eventsRepository.removeUser(_id);
  }

  async findEventBySlug(email: string): Promise<EventDocument> {
    const event = this.eventsRepository.findOne(email);
    if (!event) {
      throw new NotFoundException('User not found');
    }
    return event;
  }


  async findUserById(_id: Types.ObjectId): Promise<EventDocument> {
    const event = this.eventsRepository.findUserById(_id);
    if (!event) {
      throw new NotFoundException('User not found');
    }
    return event;
  }
}
