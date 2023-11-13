import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { ReservationsService } from '../services/reservations.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserDto,
  ) {
    const _user = await this.reservationsService.create(
      createReservationDto,
      user,
    );

    return _user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      return this.reservationsService.findOne(id);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      return res.status(500).json({
        error: `An error occurred while finding the reservation: ${err.message}`,
      });
    }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
