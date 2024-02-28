import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constants';
import { BcryptService } from 'src/shared/custom-providers/bcrypt.service';

@Module({
  controllers: [UserController, AuthController],
  providers: [
    UserService, 
    AuthService,
    BcryptService
  ],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      global: true
    })
  ]
})
export class UserModule {}
