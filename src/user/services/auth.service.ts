import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/shared/interfaces/user/user.interface';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private _salt: 10;

    constructor(private jwt: JwtService) {}

    async registerUser(createUser: CreateUserDto): Promise<User[]> {
        const hashedPwd = await this.encodePwd(createUser.password);
        const { name, lastName, email } = createUser;
        const newUser = { name, lastName, email, password: hashedPwd } as User;
        throw new HttpException('Registration not available yet.', HttpStatus.FORBIDDEN);
    }

    validateCredentials(user: LoginDto): Promise<string> {
        throw new HttpException('Login not available yet.', HttpStatus.FORBIDDEN);
    }

    private encodePwd(pwd: string): Promise<string> {
        return bcrypt.hash(pwd, this._salt);
    }
}
