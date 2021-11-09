import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from './enum/role.enum';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(private db: PrismaService){}

    async create(data: Prisma.UserCreateInput, role: UserRole):Promise<User>{
        const UserExists = await this.db.user.findUnique({
            where: {email: data.email},
        });

        if (UserExists) {
            throw new ConflictException('Este email já está cadastrado!')
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const user = await this.db.user.create({
            data:{
                ...data,
                role: role,
                password: hashedPassword,
            }
        });
        delete user.password;
        return user;
    }

    async findOne (id: string):Promise<User>{
        const user = await this.db.user.findUnique({
            where: {id},
        });

        if(!user) {
            throw new NotFoundException ('Usuário não encontrado!');
        }

        delete user.password
        return user;
    }

    async findAll(){
        const user = await this.db.user.findMany();
        const newUser = user.map(({ password, ...resto}) => resto)
        return newUser;
    }

    async delete(id: string) {
        const user = await this.db.user.delete({
            where: {id},
        });

        if(!user) {
            throw new NotFoundException ('Usuário não encontrado');            
        }

        delete user.password;
        return user;

    }




}
