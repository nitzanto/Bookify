import { AuthGuard } from '@nestjs/passport';

// local is the default strategy name
export class LocalAuthGuard extends AuthGuard('local') {}
