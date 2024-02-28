import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { mockedUserRegisterObj } from '../../shared/utils/testing/users-testing.utils';
import { BcryptService } from '../../shared/custom-providers/bcrypt.service';
import { LoginDto } from '../dto/login.dto';
import { Controller, HttpException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        BcryptService
      ],
      imports: [JwtModule]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const res = await service.registerUser(mockedUserRegisterObj);
    expect(res.password).not.toEqual(mockedUserRegisterObj.password);
   });

   it('should validate credentials', async () => {
    await service.registerUser(mockedUserRegisterObj);
    const cred = { email: mockedUserRegisterObj.email, password: mockedUserRegisterObj.password } as LoginDto;
    let res = await service.validateCredentials(cred);
    expect(res).toBeTruthy();
    cred.password = '98765432';
    res = await service.validateCredentials(cred);
    expect(res).toBeFalsy();
    cred.email = 'different@gmail.com';
    expect(async () => await service.validateCredentials(cred)).toThrow(HttpException);
   });
});
