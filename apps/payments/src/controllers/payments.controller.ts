import { Controller, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from '../dto/payments-create-charge.dto';
import { Response } from 'express';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Triggered by creation of reservations by the user (upon receiving a message)
  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(
    @Payload() data: PaymentsCreateChargeDto, // extracts the payload data from the incoming message for further processing.
    @Ctx() context: RmqContext,
    @Res() res: Response,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      channel.ack(originalMsg); // acknowledges the receipt of the message, confirming its processing.

      return this.paymentsService.makePayment(data);
    } catch (err) {
      return res.status(500).json({
        error: `Payment processing failed: ${err.message}`,
      });
    }
  }
}
