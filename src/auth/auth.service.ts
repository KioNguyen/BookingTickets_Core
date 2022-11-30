
import { DetailUserDTO } from 'src/users/dto/detail-user.dto';
import { IDetailUser } from 'src/users/entities/user-details.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

import { UsersService } from "./../users/users.service";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from 'src/users/dto/login-user.dto';
import { ILoginDetail } from 'src/users/entities/login-response.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<CreateUserDTO>): Promise<IDetailUser | any> {
    const { fullname, email, password, phone, role } = user;

    const existingUser = await this.userService.findUserByEmail(email);

    if (existingUser)
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await this.hashPassword(password);
    const newUserDTO = { fullname, email, password: hashedPassword, phone, role };
    const newUser = await this.userService.createUser(newUserDTO);
    return this.userService._getUserDetails(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IDetailUser | null> {
    const user = await this.userService.findUserByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async login(
    existingUser: LoginUserDTO,
  ): Promise<ILoginDetail | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new HttpException('Credentials invalid!', HttpStatus.UNAUTHORIZED);

    const jwt = await this.jwtService.signAsync({ user });
    return { ...user, apiToken: jwt };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
