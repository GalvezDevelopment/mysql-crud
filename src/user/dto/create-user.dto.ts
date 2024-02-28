import { IsEmail, IsNotEmpty, Length, Max, Min } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    lastName: string;
    male: boolean;
    @IsEmail()
    email: string;
    @Length(6, 16)
    password: string;
}
