import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { PaymentsProcessor } from './paymentsProcessor';

@Injectable()
export class StripePaymentsProcessor extends PaymentsProcessor {
  constructor(private readonly configService: ConfigService) {
    super();
    this.paymentProcessor = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2023-08-16',
      },
    );
  }

  async processPayment(amount: number) {
    const paymentIntent = await this.paymentProcessor.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      return_url: 'https://localhost:3000/',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    return paymentIntent;
  }
}
