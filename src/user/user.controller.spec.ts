import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../shared/interfaces/user/user.interface';
import { JwtModule } from '@nestjs/jwt';

const userRepository = {};

describe('UserController', () => {
  let controller: UserController;
  let userSrv: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository
        }
      ],
      imports: [JwtModule]
    }).compile();

    userSrv = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
