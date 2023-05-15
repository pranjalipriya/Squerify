import { Controller, Post, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './guards/decorators/decorators.IsPublic';
import { UserAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(UserAuthGuard)
  @Public()
  @Post('/login')
  async login(@Body() req: CreateAuthDto) {
    return this.authService.login(req);
  }
}
function storeToken() {
  throw new Error('Function not implemented.');
}
