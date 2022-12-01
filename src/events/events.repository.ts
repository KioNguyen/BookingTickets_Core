import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventDTO } from './dto/create-event.dto';
import { IDetailEvent } from './interface/event-details.interface';
import { EventDocument } from './_schemas/event.schema';


export class EventsRepository {
  constructor(
    @InjectModel('Event')
    private eventModel: Model<EventDocument>,
  ) { }

  async createOne(event: CreateEventDTO): Promise<IDetailEvent> {
    const newEvent = await this.eventModel.create(event);
    return newEvent;
  }


  async findUserById(_id: Types.ObjectId): Promise<any> {
    const result = this.eventModel.findById(_id);
    return result;
  }


  async removeUser(id: Types.ObjectId): Promise<{ acknowledged: boolean, deletedCount: number }> {
    const result = await this.eventModel.deleteOne({ _id: id });
    return result;
  }

  async getAll(): Promise<EventDocument[]> {
    const result = await this.eventModel.find({});
    return result;
  }

  async findOne(email: string): Promise<any> {
    const result = await this.eventModel.findOne({ email: email });
    return result;
  }
  async findOneAndUpdate(id: Types.ObjectId, eventInfor: IDetailEvent): Promise<IDetailEvent> {
    const result = await this.eventModel.findByIdAndUpdate(id, eventInfor, { new: true });
    return result;
  }

  async updateMany(conditions: any, set: any) {
    const result = await this.updateMany(conditions, set);
    return result;
  }

  async getWithConditions(filter: any): Promise<EventDocument[]> {
    const result = await this.eventModel.find(filter);
    return result;
  }
}
