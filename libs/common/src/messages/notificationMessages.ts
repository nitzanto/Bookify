export const purchaseNotification = (
  amount: number,
  invoiceId: string,
): string => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .invoice-header {
            background-color: #f2f2f2;
            padding: 10px;
          }
          .invoice-details {
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <img src="your_logo_url" alt="Bookify Logo" style="max-width: 200px;" />
        </div>
        <p>Subject: Receipt for Payment at Bookify - Reservation Table</p>
        <p>Your payment of $${amount} for Invoice #${invoiceId} has been successfully processed.</p>
        <div class="invoice-details">
          <p>Invoice ID: ${invoiceId}</p>
        </div>
        <p>Your payment has been received and credited against the outstanding invoice. We appreciate your promptness in settling this transaction.</p>
        <p>Thank you for your business and continued support. We look forward to serving you in the future.</p>
        <p>If you have any questions regarding this payment, please don't hesitate to contact our support team at <a href="https://bookify.com">bookify.com</a>.</p>
        <p>Warm regards,<br />Bookify</p>
      </body>
    </html>
  `;
};
