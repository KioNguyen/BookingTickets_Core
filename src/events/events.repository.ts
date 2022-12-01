import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventDTO } from './dto/create-event.dto';
import { EventDocument } from './_schemas/event.schema';


export class EventsRepository {
  constructor(
    @InjectModel('Event')
    private eventModel: Model<EventDocument>,
  ) { }

  async createOne(event: CreateEventDTO): Promise<EventDocument> {
    const newEvent = new this.eventModel(event);
    return newEvent.save();
  }


  async findUserById(_id: Types.ObjectId): Promise<any> {
    const result = this.eventModel.findById(_id);
    return result;
  }


  async removeUser(id: Types.ObjectId): Promise<{ acknowledged: boolean, deletedCount: number }> {
    const result = await this.eventModel.deleteOne({ _id: id });
    return result;
  }

  async getAll(): Promise<any> {
    const result = await this.eventModel.find({});
    return result;
  }

  async findOne(email): Promise<any> {
    const result = await this.eventModel.findOne({ email: email });
    return result;
  }
}
