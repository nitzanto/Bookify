import { AuthGuard } from '@nestjs/passport';

// Injecting the local strategy to be used via the LocalAuthGuard
export class LocalAuthGuard extends AuthGuard('local') {}
