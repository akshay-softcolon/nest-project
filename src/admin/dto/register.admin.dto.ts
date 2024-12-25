import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAdminDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}