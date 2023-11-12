import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '@app/common/dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // Injects the auth microservice into ClientProxy for communication with that microservice
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.authentication;
    if (!jwt) {
      return false;
    }

    // sends a message to the 'authenticate' method of the 'auth' service with the JWT token for validation.
    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true), // allowing access to the guarded route if authenticated
        catchError(() => of(false)), // If the token is invalid or an error occurs during verification denys access to the route
      );
  }
}
