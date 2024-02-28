import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { User } from 'src/shared/interfaces/user/user.interface';

@Controller('user')
export class UserController {

    @Get(':id')
    getUser(@Query() id: string): Promise<User> {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
}
