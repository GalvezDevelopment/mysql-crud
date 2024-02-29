import { Body, Controller, Get, HttpException, HttpStatus, Patch, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/shared/interfaces/user/user.interface';
import { ModifyUserDto } from './dto/modify-user.dto';
import { AuthGuard } from './guards/auth/auth.guard';
import { UserService } from './services/user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private _userSrv: UserService) {}
    
    @Get()
    getUsers(): Promise<User[]> {
        return this._userSrv.getAll();
    }

    @Get(':id')
    getUser(@Query() id: string): Promise<User> {
        throw new HttpException('User not found.', HttpStatus.FORBIDDEN);
    }

    @Patch()
    modifyUser(@Body() user: ModifyUserDto): Promise<User> {
        throw new HttpException('User not found.', HttpStatus.FORBIDDEN);
    }
}
