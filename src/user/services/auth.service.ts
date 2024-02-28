import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/shared/interfaces/user/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { BCRYPT_TOKEN } from '../../shared/custom-providers/bcrypt.service';

@Injectable()
export class AuthService {
    private _user: User;
    private _salt = 10;

    constructor(private jwt: JwtService, @Inject(BCRYPT_TOKEN) private _bcrypt: any) {}

    async registerUser(createUser: CreateUserDto): Promise<User> {
        const hashedPwd = await this.encodePwd(createUser.password);
        const { name, lastName, email } = createUser;
        const newUser = { name, lastName, email, password: hashedPwd } as User;
        this._user = newUser;
        return newUser;
    }

    validateCredentials(user: LoginDto): Promise<string> {
        if (this._user.email !== user.email) throw new HttpException('Email does not exist.', HttpStatus.NOT_FOUND);
        return this._bcrypt.compare(user.password, this._user.password);
    }

    private encodePwd(pwd: string): Promise<string> {
        return this._bcrypt.hash(pwd, this._salt);
    }
}
