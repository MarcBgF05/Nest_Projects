import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from 'src/DTOs/user.dto';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UsersService,
    private jwt: JwtService,
  ) {}

  async createUser(user: RegisterDto) {
    const newUser = new this.userModel(user);

    //Encriptación de la contraseña
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const userSaved = await newUser.save();

    //generando token
    const newUserId = await this.userService.findId(userSaved.email);
    const payload = { username: newUser.name, userId: newUserId };

    return {
      newUser: userSaved,
      access_token: await this.jwt.signAsync(payload),
    };
  }

  async userLogin(user: LoginDto) {
    const userFound = await this.userService.findByNameOrEmail(user.email);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await this.comparePasswords(
      user.password,
      userFound.password,
    );
    if (!isMatch) {
      throw new HttpException('Invalid Credentials', HttpStatus.CONFLICT);
    }
    const userId = await this.userService.findId(user.email);

    const payload = { username: userFound.name, userId: userId };

    return {
      user,
      access_token: await this.jwt.signAsync(payload),
    };
  }

  async comparePasswords(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }
}
