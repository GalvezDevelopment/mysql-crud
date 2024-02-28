import { IsEmail, IsNotEmpty, Max, Min } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    lastName: string;
    male: boolean;
    @IsEmail()
    email: string;
    @Min(6)
    @Max(16)
    password: string;
}
