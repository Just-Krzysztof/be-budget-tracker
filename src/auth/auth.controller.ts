import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EmailChecker } from './dto/email-checker.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }

  @Get('check-email')
  async checkEmail(@Query('email') email: EmailChecker) {
    return this.authService.isEmailExist(email);
  }
}
