import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/orders/_schemas/order.schema';
import { OrdersRepository } from './orders.repository';
import { UsersModule } from 'src/users/users.module';
import { TicketsModule } from 'src/tickets/tickets.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Order", schema: OrderSchema }]),
    UsersModule,
    TicketsModule,
    EventsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule { }
