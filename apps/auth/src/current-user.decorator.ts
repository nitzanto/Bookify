import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';

// Decorator used to pull the user object from the request object data
const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
