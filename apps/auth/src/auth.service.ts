import { Injectable } from '@nestjs/common';
import { UserDocument } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response) {
    const tokenPayLoad: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    // Generating the JWT token for the user
    const token = this.jwtService.sign(tokenPayLoad);

    // Securing the cookie for HTTP requests only without client-side
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }
}
