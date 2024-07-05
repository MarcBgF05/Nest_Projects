import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthRequired implements NestMiddleware {
  constructor(private jwt: JwtService) {}

  async use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      console.log('Middleware');

      const { access_token } = req.cookies;

      if (!access_token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const payload = await this.jwt.verifyAsync(access_token, {
        secret: jwtConstants.secret,
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
