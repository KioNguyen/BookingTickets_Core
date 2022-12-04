import { Controller, Post, Body, Get, Delete, Param, BadRequestException, HttpException, HttpStatus, UseGuards, Put, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { isValidObjectId, Types } from 'mongoose';
import { JwtAuthGuard, AdminGuard } from 'src/auth/guards/jwt.guard';
import * as Utils from 'src/utils/utils';
import { CreateOrderDTO } from './dto/create-order.dto';
import { IDetailOrder } from './interface/order-details.interface';
import { IDetailOrderWithUser } from './interface/order-user-detail.interface';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() order: CreateOrderDTO): Promise<CreateOrderDTO> {
    let newOrder = await this.ordersService.createOrder(order);
    return this.ordersService._getOrderDetails(newOrder);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllOrder(@Query() query: any): Promise<IDetailOrderWithUser[]> {
    return await this.ordersService.getAllOrders(query);
  }


  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async getOrder(@Param("id") id: Types.ObjectId): Promise<IDetailOrder> {
    Utils.idValidObjectId(id)
    return await this.ordersService.getOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBadRequestResponse({ description: "Order ID is not valid" })
  @Put("/:id")
  async updateOrder(@Param("id") id: Types.ObjectId, @Body() order: CreateOrderDTO): Promise<CreateOrderDTO> {
    Utils.idValidObjectId(id)
    return await this.ordersService.updateOrder(id, order);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({ description: "Order ID is not valid" })
  @Delete("/:id")
  async deleteOrder(@Param("id") id: Types.ObjectId) {
    Utils.idValidObjectId(id)
    return await this.ordersService.removeOrder(id);
  }
}
