import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateAdminDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}