import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/shared/interfaces/user/user.interface';
import { ModifyUserDto } from '../dto/modify-user.dto';

@Injectable()
export class UserService {
    constructor() {}

    getAll(): Promise<User[]> {
        throw new HttpException('Getting Users functionality not available yet', HttpStatus.FORBIDDEN);
    }

    getById(): Promise<User> {
        throw new HttpException('Getting a User not available yet.', HttpStatus.FORBIDDEN);
    }

    modifyUser(user: ModifyUserDto): Promise<User> {
        throw new HttpException('Modifying a User is not available yet.', HttpStatus.FORBIDDEN);
    }
}
