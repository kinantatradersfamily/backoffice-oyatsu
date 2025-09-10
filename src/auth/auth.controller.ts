import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }
    return this.authService.login(user);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(LocalAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
