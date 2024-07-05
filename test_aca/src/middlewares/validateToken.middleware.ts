import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthRequired implements NestMiddleware {
  constructor(private jwt: JwtService) {}

  async use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      console.log('middleware');
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const tokencito = token.split('')[1];

      const payload = await this.jwt.verifyAsync(tokencito, {
        secret: 'palabra_Secreta',
      });
      if (!payload) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }

      req.body.user = payload;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
