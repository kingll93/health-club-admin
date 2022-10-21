import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { NO_AUTH } from 'src/core/decorators/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const noAuth = this.reflector.get<boolean>(NO_AUTH, context.getHandler());
    if (noAuth) {
      return true
    }
    
    const guard = new (PassportAuthGuard('jwt'))();
    return guard.canActivate(context); //  执行所选策略Guard的canActivate方法
  }
}
