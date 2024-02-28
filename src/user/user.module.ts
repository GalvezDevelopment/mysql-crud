import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService]
})
export class UserModule {}
