import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }
  @Post('register')
  register(@Body() dto: UserDto){
    return this.authService.register(dto);
  }

}