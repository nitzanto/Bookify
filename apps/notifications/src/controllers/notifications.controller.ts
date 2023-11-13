import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from '../dto/notify-email.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    try {
      await this.notificationsService.notifyEmail(data);
    } catch (err) {
      console.log(`Error notifying mail: ${err}`);
      return 'Notification to mail error has occurred';
    }
  }
}
