import { HttpException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { BCRYPT_TOKEN, BcryptService } from '../../shared/custom-providers/bcrypt.service';
import { mockedUserRegisterObj } from '../../shared/utils/testing/users-testing.utils';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../shared/interfaces/user/user.interface';

const mockRepository = {
  save: (user: User) => Promise.resolve(true),
  findOneBy: (obj: { [prop: string]: keyof User }) => Promise.resolve({ password: '1234567' })
};

describe('AuthService', () => {
  let service: AuthService;
  let bcryptSrv: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        BcryptService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ],
      imports: [JwtModule]
    }).compile();

    bcryptSrv = module.get<typeof BcryptService>(BCRYPT_TOKEN);
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
    const mock = jest.spyOn(bcryptSrv, 'compare').mockReturnValue(Promise.resolve(true));
    const cred = { email: mockedUserRegisterObj.email, password: mockedUserRegisterObj.password } as LoginDto;
    let res = await service.validateCredentials(cred);
    expect(res).toBeTruthy();
    cred.password = '98765432';
    mock.mockReturnValue(Promise.resolve(false));
    try {
      await service.validateCredentials(cred);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});
