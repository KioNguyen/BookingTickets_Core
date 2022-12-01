import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDo } from 'src/users/_schemas/user.do';
import { CreateUserDTO } from './dto/create-user.dto';
import { DetailUserDTO } from './dto/detail-user.dto';
import { UserDocument } from './_schemas/user.schema';


export class UsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) { }

  async createOne(user: CreateUserDTO): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }


  async findUserById(_id: Types.ObjectId): Promise<any> {
    const result = this.userModel.findById(_id);
    return result;
  }


  async removeUser(id: Types.ObjectId): Promise<{ acknowledged: boolean, deletedCount: number }> {
    const result = await this.userModel.deleteOne({ _id: id });
    return result;
  }

  async getAll(): Promise<any> {
    const result = await this.userModel.find({});
    return result;
  }

  async findOne(email): Promise<any> {
    const result = await this.userModel.findOne({ email: email });
    return result;
  }
}
