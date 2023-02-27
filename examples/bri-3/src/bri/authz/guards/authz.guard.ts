import { ForbiddenError } from '@casl/ability';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthzFactory } from '../authz.factory';
import { CHECK_AUTHZ, IRequirement } from './authz.decorator';

@Injectable()
export class AuthzGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authzFactory: AuthzFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requirements =
      this.reflector.get<IRequirement[]>(CHECK_AUTHZ, context.getHandler()) ||
      [];

    const req = context.switchToHttp().getRequest();
    const authz = this.authzFactory.buildAuthzFor(req.bpiSubject);

    try {
      for (const requirement of requirements) {
        ForbiddenError.from(authz).throwUnlessCan(
          requirement.action,
          requirement.subject,
        );
      }
      return true;
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }
}