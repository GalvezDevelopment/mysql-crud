import { User } from "src/shared/interfaces/user/user.interface";

export class ModifyUserDto {
    id: string;
    user: Omit<User, 'id' | 'email'>;
}
