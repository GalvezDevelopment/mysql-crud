import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../../shared/interfaces/user/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { BCRYPT_TOKEN } from '../../shared/custom-providers/bcrypt.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConstants } from '../../constants/jwt.constants';

@Injectable()
export class AuthService {
    private _salt = 10;

    constructor(
        private jwt: JwtService, 
        @Inject(BCRYPT_TOKEN) private _bcrypt: any,
        @InjectRepository(User) private _userRepository: Repository<User>
        ) {}

    async registerUser(createUser: CreateUserDto): Promise<User> {
        const hashedPwd = await this.encodePwd(createUser.password);
        const { name, lastName, email, male } = createUser;
        const newUser = { name, lastName, email, password: hashedPwd, male } as User;
        await this._userRepository.save(newUser);
        return newUser;
    }

    async validateCredentials(user: LoginDto): Promise<string> {
        const found = await this._userRepository.findOneBy({ email: user.email });
        const success = await this._bcrypt.compare(user.password, found.password);
        if (!success) throw new HttpException('Invalid email/password.', HttpStatus.UNAUTHORIZED);
        return this.jwt.signAsync({ sub: found.id, username: found.email }, { secret: jwtConstants.secret });
    }

    private encodePwd(pwd: string): Promise<string> {
        return this._bcrypt.hash(pwd, this._salt);
    }
}
