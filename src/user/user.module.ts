import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constants';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      global: true
    })
  ]
})
export class UserModule {}
