import { Controller, Post, Body, Get, Delete, Param, BadRequestException, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { isValidObjectId, Types } from 'mongoose';
import { JwtAuthGuard, AdminGuard } from 'src/auth/guards/jwt.guard';
import * as Utils from 'src/utils/utils';
import { CreateEventDTO } from './dto/create-event.dto';
import { IDetailEvent } from './interface/event-details.interface';

@ApiTags('Events')
@Controller('api/events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  async createEvent(@Body() event: CreateEventDTO): Promise<IDetailEvent> {
    let newEvent = await this.eventsService.createEvent(event);
    return this.eventsService._getEventDetails(newEvent);
  }

  @Get()
  async getAllEvent() {
    return await this.eventsService.getAllEvents();
  }

  @ApiBadRequestResponse({ description: "User ID is not valid" })
  @Delete("/:id")
  async deleteUser(@Param("id") id: Types.ObjectId) {
    Utils.idValidObjectId(id)
    return await this.eventsService.removeEvent(id);
  }
}
