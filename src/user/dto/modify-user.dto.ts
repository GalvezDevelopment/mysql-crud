import { CreateUserDto } from "./create-user.dto";

export class ModifyUserDto {
    id: string;
    user: Omit<CreateUserDto, 'id' | 'email'>;
}
