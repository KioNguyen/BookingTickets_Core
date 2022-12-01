import { Controller, Post, Body, Get, Delete, Param, BadRequestException, HttpException, HttpStatus, UseGuards, Put } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { isValidObjectId, Types } from 'mongoose';
import { JwtAuthGuard, AdminGuard } from 'src/auth/guards/jwt.guard';
import * as Utils from 'src/utils/utils';
import { CreateTicketDTO } from './dto/create-ticket.dto';
import { IDetailTicket } from './interface/ticket-details.interface';

@ApiTags('Tickets')
@Controller('api/tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  async createTicket(@Body() ticket: CreateTicketDTO): Promise<IDetailTicket> {
    let newTicket = await this.ticketsService.createTicket(ticket);
    return this.ticketsService._getTicketDetails(newTicket);
  }

  @Get()
  async getAllTicket(): Promise<IDetailTicket[]> {
    return await this.ticketsService.getAllTickets();
  }


  @Get("/:id")
  async getTicket(@Param("id") id: Types.ObjectId): Promise<IDetailTicket> {
    Utils.idValidObjectId(id)
    return await this.ticketsService.getTicket(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({ description: "Ticket ID is not valid" })
  @Put("/:id")
  async updateTicket(@Param("id") id: Types.ObjectId, @Body() ticket: IDetailTicket): Promise<IDetailTicket> {
    Utils.idValidObjectId(id)
    return await this.ticketsService.updateTicket(id, ticket);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @ApiBadRequestResponse({ description: "Ticket ID is not valid" })
  @Delete("/:id")
  async deleteTicket(@Param("id") id: Types.ObjectId) {
    Utils.idValidObjectId(id)
    return await this.ticketsService.removeTicket(id);
  }
}
