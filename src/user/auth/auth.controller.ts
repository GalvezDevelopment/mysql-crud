import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('auth')
export class AuthController {
    @Post('register')
    registerUser(@Body() createUser: CreateUserDto): Promise<boolean> {
        throw new HttpException('Registration could not be achieved', HttpStatus.NOT_ACCEPTABLE);
    }

    @Post()
    login(@Body() login: LoginDto): Promise<string> {
        throw new HttpException('Login is not working.', HttpStatus.NOT_ACCEPTABLE);
    }
}
