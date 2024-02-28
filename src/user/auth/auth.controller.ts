import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from '../services/auth.service';
import { User } from 'src/shared/interfaces/user/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private _authSrv: AuthService) { }

    @Post('register')
    async registerUser(@Body() createUser: CreateUserDto): Promise<User> {
        return this._authSrv.registerUser(createUser);
    }

    @Post()
    async login(@Body() login: LoginDto): Promise<string> {
        return await this._authSrv.validateCredentials(login);
    }
}
