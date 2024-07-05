import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/DTOs/createUserDto';
import { LoginDto } from 'src/DTOs/loginDto';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async singUp(
    @Body() user: CreateUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const userFound = await this.userService.findOne(user.email);
      console.log(userFound);
      if (userFound) {
        if (userFound.name === user.name) {
          throw new HttpException(
            'Username and email already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
      }

      //console.log('Extrayendo datos');
      const { newUser, access_token } = await this.authService.signUp(user);
      console.log('register: ', access_token);
      res.cookie('access_token', access_token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      });

      return newUser;
    } catch (error) {
      //console.log('sucedio un error', error);
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async signIn(
    @Body() user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const userFound = await this.userService.findOne(user.email);
      if (!userFound) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const isMatch = await this.authService.comparePasswords(
        user.password,
        userFound.password,
      );
      if (!isMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
      }

      const { access_token } = await this.authService.singIn(user);

      res.cookie('access_token', access_token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      });

      res.status(201).json({
        username: userFound.name,
        email: userFound.email,
      });
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('verify')
  async verifyToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const { access_token } = req.cookies;

    if (!access_token) return res.sendStatus(401);

    const result = await this.authService.verifyToken(access_token);
    console.log(result);
    return result;

    // this.jwtService.verify();
  }
}
