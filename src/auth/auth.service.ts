import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private users = [
    {
      id: 1,
      username: 'admin',
      password: '123456',
      role: 1,
    },
    {
      id: 2,
      username: 'member1',
      password: '123456',
      role: 0,
    },
  ];

  async validateUser(username: string, password: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userPass = await bcrypt.hash(user?.password, 10);
    const condition = await bcrypt.compare(password, userPass);

    if (condition) {
      return { id: user.id, username: user.username, role: user.role };
    } else {
      throw new UnauthorizedException('password incorrect');
    }
  }

  login(user: { id: number; username: string; role: number }) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      message: {
        role: user.role,
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
