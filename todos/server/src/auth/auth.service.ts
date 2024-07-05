import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/DTOs/createUserDto';
import { User } from 'src/schemas/user';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/DTOs/loginDto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private model: Model<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDTO) {
    const newUser = new this.model(user);

    //Encripto la contraseña
    newUser.password = await bcrypt.hash(newUser.password, 10);
    // Guardo el usuario en la base de datos
    const userSaved = await newUser.save();

    // token
    const newUserId = await this.userService.findIdOfUser(userSaved.email);
    console.log('Id del usuario nuevo registrado: ', newUserId);
    const payload = { username: newUser.name, userId: newUserId };

    return {
      newUser: userSaved,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singIn(user: LoginDto) {
    const userFound = await this.userService.findOne(user.email);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(user.password, userFound.password))) {
      throw new UnauthorizedException();
    }

    const userId = await this.userService.findIdOfUser(user.email);

    const payload = { username: userFound.name, userId: userId };

    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      return {
        userId: payload.userId,
        username: payload.username,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  async comparePasswords(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }
}
