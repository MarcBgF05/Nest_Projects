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
import { LoginDto, RegisterDto } from 'src/DTOs/user.dto';
import { UsersService } from 'src/users/users.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() user: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      console.log(user);
      //buscamos si ya existe el usuario.
      const userFound = await this.userService.findByNameOrEmail(user.email);
      console.log(userFound);
      if (userFound) {
        if (userFound.name === user.name || userFound.email === user.email) {
          throw new HttpException(
            'Username and email already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      // Extracción del usuario nuevo y el token de acceso.
      const { newUser, access_token } = await this.authService.createUser(user);
      console.log(newUser, access_token);
      res.status(201).json({
        user: newUser,
        token: access_token,
      });
    } catch (error) {
      console.log('error in register controller', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() user: LoginDto, @Res() res: Response) {
    try {
      const userFound = await this.userService.findByNameOrEmail(user.email);
      if (!userFound) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const { access_token } = await this.authService.userLogin(user);

      res.status(200).json({
        username: userFound.name,
        email: userFound.email,
        token: access_token,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('verify')
  async verifyToken(@Req() req: Request, @Res() res: Response) {
    try {
      // Aquí puedes acceder a la información del usuario desde req.body.user
      const user = req.body.user;
      if (!user) {
        throw new HttpException('No token provider', HttpStatus.CONFLICT);
      }
      // Si el token es válido, puedes devolver una respuesta exitosa
      return res.status(200).json({
        message: 'Token válido',
        user,
      });
    } catch (error) {
      // Si ocurre algún error, puedes manejarlo aquí
      return res.status(500).json({
        message: 'Error al verificar el token',
        error: error.message,
      });
    }
  }
}
