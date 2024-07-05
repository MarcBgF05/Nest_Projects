import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   *
   * @param user es el correo o username que se envíe
   */
  async findByNameOrEmail(user: string) {
    return await this.userModel.findOne({
      $or: [{ name: user }, { email: user }],
    });
  }

  async findId(email: string) {
    const userId = await this.userModel.findOne({ email }).select('_id').exec();
    return userId;
  }

  async findById(id: string) {
    return await this.userModel.findById(id).exec();
  }
}
