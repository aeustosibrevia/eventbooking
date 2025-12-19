import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(
    @Body() bookingData: { userId: number; eventId: number },
  ): Promise<Booking> {
    return this.bookingsService.create(bookingData);
  }

  @Get()
  async findAll(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @Get('event/:eventId')
  async findByEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
  ): Promise<Booking[]> {
    return this.bookingsService.findByEvent(eventId);
  }
}
