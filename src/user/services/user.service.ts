import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../shared/interfaces/user/user.interface';
import { Repository } from 'typeorm';
import { ModifyUserDto } from '../dto/modify-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private _userRepository: Repository<User>) {}

    getAll(): Promise<User[]> {
        return this._userRepository.find();
    }

    getById(): Promise<User> {
        throw new HttpException('Getting a User not available yet.', HttpStatus.FORBIDDEN);
    }

    modifyUser(user: ModifyUserDto): Promise<User> {
        throw new HttpException('Modifying a User is not available yet.', HttpStatus.FORBIDDEN);
    }
}
