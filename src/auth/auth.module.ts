import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtAuthGuard, AdminGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.BOOKING_SECRET_KEY,
        signOptions: { expiresIn: process.env.BOOKING_JWT_EXPIRE },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, AdminGuard, JwtStrategy],
  // exports: [AuthService, JwtAuthGuard, AdminGuard, JwtStrategy],
})
export class AuthModule { }
