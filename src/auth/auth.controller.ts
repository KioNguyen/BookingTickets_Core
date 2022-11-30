import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DetailUserDTO } from 'src/users/dto/detail-user.dto';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { IDetailUser } from 'src/users/entities/user-details.entity';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ILoginDetail } from 'src/users/entities/login-response.entity';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  register(@Body() user: CreateUserDTO): Promise<IDetailUser | null> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginUserDTO): Promise<ILoginDetail | null> {
    return this.authService.login(user);
  }

  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  verifyJwt(@Body() payload: { jwt: string }) {
    return this.authService.verifyJwt(payload.jwt);
  }
}
