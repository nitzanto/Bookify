import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATIONS_SERVICE, purchaseNotification } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from '../dto/payments-create-charge.dto';
import { StripePaymentsProcessor } from '../libs/payments-procesors/StripePaymentsProcessor';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
    @Inject(StripePaymentsProcessor)
    private readonly stripePaymentProcessor: StripePaymentsProcessor,
  ) {}

  async makePayment({ amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent =
      await this.stripePaymentProcessor.processPayment(amount);

    const invoiceId = paymentIntent.id ? paymentIntent.id : 'N/A';

    // Async broadcast event/message to the notifications microservice triggering a notification email event
    this.notificationsService.emit('notify_email', {
      email,
      text: purchaseNotification(amount, invoiceId),
    });

    return paymentIntent;
  }
}
