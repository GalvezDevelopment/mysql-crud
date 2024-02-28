import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/shared/interfaces/user/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let authSrv: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [JwtModule]
    }).compile();

    authSrv = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should registrate an user', async () => {
    const newUser = { name: 'John', lastName: 'Cena', male: false, email: 'john@gmail.com', password: '123456' } as CreateUserDto;
    jest.spyOn(authSrv, 'registerUser').mockReturnValue(new Promise<User>((resolve, reject) => resolve({} as User)));
    const res = await controller.registerUser(newUser);
    expect(authSrv.registerUser).toHaveBeenCalled();
    expect(res).toMatchObject({});
  });

  it('should login an user', async () => {
    const creds = { email: 'john@gmail.com', password: '123456' } as LoginDto;
    jest.spyOn(authSrv, 'validateCredentials').mockReturnValue(new Promise((resolve, reject)=>resolve('token')));
    const res = await controller.login(creds);
    expect(authSrv.validateCredentials).toHaveBeenCalled();
    expect(res).toEqual('token');
  });
});
