import { Controller, Post, Body, Get, Delete, Param, BadRequestException, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { isValidObjectId, Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  idValidObjectId(id: Types.ObjectId) {
    if (!isValidObjectId(id)) {
      throw new HttpException("Invalid ObjectId", HttpStatus.BAD_REQUEST)
    }
  }


  // @ApiOkResponse({
  //   description: "Created the user",
  // })
  // @ApiBadRequestResponse({
  //   description: "Username/Email is already used",
  // })
  // @ApiInternalServerErrorResponse({
  //   description: "Can't create user",
  // })
  // @ApiBadRequestResponse({
  //   description: "Some user data is invalid",
  // })
  // @Post('register')
  // async createUser(@Body() createUserDto: CreateUserDTO) {
  //   let user = await this.usersService.createUser(createUserDto).then(res => {
  //     console.log("🚀 ~ file: users.controller.ts:35 ~ UsersController ~ returnawaitthis.usersService.createUser ~ res", res)
  //     let { password, ...result } = res;
  //     return result;
  //   }).catch(err => {
  //     throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   })

  //   return user;

  // }


  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @ApiBadRequestResponse({ description: "User ID is not valid" })
  @Delete("/:id")
  async deleteUser(@Param("id") id: Types.ObjectId) {
    this.idValidObjectId(id)
    return await this.usersService.removeUser(id);
  }
}
