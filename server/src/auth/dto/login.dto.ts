import { IsString, Length, IsEmail, IsNotEmpty } from "class-validator";
export class LoginDto {
    @IsEmail()
    email: string;

    @Length(6, 16)
    @IsString({message:'Senha incorreta!'})
    password: string;
}
