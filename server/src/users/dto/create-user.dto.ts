//Data tranfer Object = Objeto de tranfência de dados;
import { IsString, Length, IsEmail, IsNotEmpty } from "class-validator";
export class CreateUserDto{
    @IsString({message: 'Informe um nome válido'})
    @Length(2, 100)
    name: string;

    @IsEmail({}, {message: 'Informe um endereço de email válido'}) 
    @IsString()       
    email: string;

    
    @Length(6, 16)
    @IsString({message:'Senha incorreta!'})
    password: string;

    
    @Length(6, 16)
    @IsString({message:'Senha incorreta!'})
    passwordConfirmation: string;
}