import { AuthGuard } from '@nestjs/passport';

// Injecting the local strategy to be used via the JwtAuthGuard
export class JwtAuthGuard extends AuthGuard('jwt') {}
