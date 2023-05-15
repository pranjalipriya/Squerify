import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utility/password';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const matched = comparePassword(password, user.password);
    if (user && matched) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const userData = await this.userService.findByUsername(user.username);

    const payload = { username: userData.username, userid: userData.id };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }

}
