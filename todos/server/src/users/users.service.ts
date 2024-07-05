import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  //Promise<User | undefined> sirve para indicar que la función retornará un objeto de tipo User o undefined y es Promise dado que es una operación asíncrona.
  async findOne(email: string): Promise<User | undefined> {
    return await this.model.findOne({ email }).exec();
  }

  async getAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findIdOfUser(email: string) {
    const user = await this.model.findOne({ email }).select('_id').exec();
    return user._id;
  }

  async findById(id: string) {
    return await this.model.findById(id).exec();
  }
}
