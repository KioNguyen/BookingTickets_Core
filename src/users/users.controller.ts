import { Controller, Post, Body, Get, Delete, Param, BadRequestException, HttpException, HttpStatus, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { isValidObjectId, Types } from 'mongoose';
import { AdminGuard, JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import * as Utils from 'src/utils/utils';
import { IDetailUser } from './entities/user-details.entity';
import { UpdateUserDTO } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }


  idValidObjectId(id: Types.ObjectId) {
    if (!isValidObjectId(id)) {
      throw new HttpException("Invalid ObjectId", HttpStatus.BAD_REQUEST)
    }
  }


  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({ description: "User ID is not valid" })
  @Delete("/:id")
  async deleteUser(@Param("id") id: Types.ObjectId) {
    Utils.idValidObjectId(id)
    return await this.usersService.removeUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({ description: "User ID is not valid" })
  @Put("/:id")
  async updateUser(@Param("id") id: Types.ObjectId, @Body() userInfor: UpdateUserDTO): Promise<CreateUserDTO | null> {
    Utils.idValidObjectId(id)
    return await this.usersService.updateUser(id, userInfor);
  }
}
