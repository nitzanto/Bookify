export abstract class PaymentsProcessor {
  protected paymentProcessor: any;
  abstract processPayment(amount: number): Promise<any>;
}
