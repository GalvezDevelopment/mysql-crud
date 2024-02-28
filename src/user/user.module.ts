import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
  imports: [
    JwtModule
  ]
})
export class UserModule {}
