import { PaymentsCreateChargeDto } from '../../dto/payments-create-charge.dto';

export abstract class PaymentsProcessor {
  protected paymentProcessor: any;
  abstract createCharge(data: PaymentsCreateChargeDto): Promise<any>;
}
