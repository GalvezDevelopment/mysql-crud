import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
    @Post('register')
    registerUser(): Promise<boolean> {
        throw new HttpException('Registration could not be achieved', HttpStatus.NOT_ACCEPTABLE);
    }

    @Post()
    login(@Body() login: LoginDto): Promise<string> {
        throw new HttpException('Login is not working.', HttpStatus.NOT_ACCEPTABLE);
    }
}
