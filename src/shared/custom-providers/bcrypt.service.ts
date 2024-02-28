import * as bcrypt from 'bcrypt';

export const BCRYPT_TOKEN = 'BCRYPT';

export const BcryptService =     {
    provide: BCRYPT_TOKEN,
    useValue: bcrypt
  };