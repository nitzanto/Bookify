export const purchaseNotification = (amount: number): string => {
  return `Subject: Receipt for Payment at Bookify - Reservation Table

Your payment of $${amount} has been successfully processed. 

Your payment has been received and credited against the outstanding invoice. We appreciate your promptness in settling this transaction.

Thank you for your business and continued support. We look forward to serving you in the future.

If you have any questions regarding this payment, please don't hesitate to contact our support team at bookify.com.

Warm regards,
Bookify
`;
};
