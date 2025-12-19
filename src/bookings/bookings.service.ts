import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { UsersService } from '../users/users.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
  ) {}

  async create(bookingData: {
    userId: number;
    eventId: number;
  }): Promise<Booking> {
    try {
      await this.usersService.findOne(bookingData.userId);
    } catch {
      throw new BadRequestException(
        `User with id ${bookingData.userId} does not exist`,
      );
    }

    try {
      await this.eventsService.findOne(bookingData.eventId);
    } catch {
      throw new BadRequestException(
        `Event with id ${bookingData.eventId} does not exist`,
      );
    }

    const booking = this.bookingRepository.create(bookingData);
    return this.bookingRepository.save(booking);
  }

  findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  findByEvent(eventId: number): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { eventId } });
  }
}
