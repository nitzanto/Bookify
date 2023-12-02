import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CurrentUser, UserDocument } from '@app/common';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Verifies user credentials using the LocalAuthGuard, and upon successful authentication, generates a JWT via the AuthService.
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response, // for manual control of the response to the client
  ) {
    // User is valid and JWT is being set to this user (client)
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    // Call the logout method from the AuthService
    await this.authService.logout(response);
    response.status(200).send('Logged out successfully');
  }

  // Validates the user's JWT token via the JwtAuthGuard, ensuring the incoming message is authenticated.
  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate') // Listens for messages with the specified pattern
  async authenticate(@Payload() data: any) {
    return data.user; // Returns the user's details after successful JWT validation.
  }
}
