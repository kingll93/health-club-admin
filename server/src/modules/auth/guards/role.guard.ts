import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLE } from 'src/core/decorators/role.decorator';
import { UserRole } from 'src/core/enums/common.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<UserRole>(ROLE, context.getHandler());
    if (role === undefined) {
      return true
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.role === role) {
      return true
    } else {
      throw new ForbiddenException('没有对应的角色权限！')
    }
  }
}
