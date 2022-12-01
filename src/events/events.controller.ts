import { Controller, Post, Body, Get, Delete, Param, BadRequestException, HttpException, HttpStatus, UseGuards, Put } from '@nestjs/common';
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
  async getAllEvents(): Promise<IDetailEvent[]> {
    return await this.eventsService.getAllEvents();
  }


  @Get("/:id")
  async getEvent(@Param("id") id: Types.ObjectId): Promise<IDetailEvent> {
    Utils.idValidObjectId(id)
    return await this.eventsService.getEvent(id);
  }

  @ApiBadRequestResponse({ description: "Event ID is not valid" })
  @Put("/:id")
  async updateEvent(@Param("id") id: Types.ObjectId, @Body() event: IDetailEvent): Promise<IDetailEvent> {
    Utils.idValidObjectId(id)
    return await this.eventsService.updateEvent(id, event);
  }

  @ApiBadRequestResponse({ description: "Event ID is not valid" })
  @Delete("/:id")
  async deleteEvent(@Param("id") id: Types.ObjectId) {
    Utils.idValidObjectId(id)
    return await this.eventsService.removeEvent(id);
  }
}
