import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../../constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtSrv: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const req = context.switchToHttp().getRequest();
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== 'Bearer') throw new UnauthorizedException();

    try {
      const payload = await this.jwtSrv.verifyAsync(token, { secret: jwtConstants.secret });
      req['user'] = payload;
    }
    catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
