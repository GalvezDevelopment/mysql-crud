import { Body, Controller, Get, HttpException, HttpStatus, Patch, Query } from '@nestjs/common';
import { User } from 'src/shared/interfaces/user/user.interface';
import { ModifyUserDto } from './dto/modify-user.dto';

@Controller('user')
export class UserController {
    
    @Get()
    getUsers(): Promise<User[]> {
        throw new HttpException('No users exist.', HttpStatus.NOT_FOUND);
    }

    @Get(':id')
    getUser(@Query() id: string): Promise<User> {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    @Patch()
    modifyUser(@Body() user: ModifyUserDto): Promise<User> {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
}
