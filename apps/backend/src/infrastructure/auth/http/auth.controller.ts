import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../../core/auth/services/auth.service';
import { User } from '../../../core/auth/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body('email') email: string): Promise<User> {
    return this.authService.register(email);
  }
}