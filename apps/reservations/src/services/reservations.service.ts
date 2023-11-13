import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationsRepository } from '../repositories/reservations.repository';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    return this.paymentsService
      .send('create_charge', { ...createReservationDto.charge, email }) // async Request & Response event
      .pipe(
        // Response handling
        map((res) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId,
          });
        }),
      );
  }

  async findAll() {
    const reservations = this.reservationsRepository.find({});

    if (!reservations) throw new NotFoundException(`Couldnt find reservations`);

    return reservations;
  }

  async findOne(_id: string) {
    const reservation = this.reservationsRepository.findOne({ _id });

    if (!reservation)
      throw new NotFoundException(`Couldnt find reservation with ID: ${_id}`);

    return reservation;
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
