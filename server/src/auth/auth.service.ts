import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  import { PrismaService } from 'src/prisma.service';
  import { LoginDto } from './dto/login.dto';
  

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {} // criando acesso ao bd

  async login(login: LoginDto) {
    const { email, password } = login;

    const user = await this.db.user.findUnique({ // consulta no banco para verificar se existe algum usuário com esse email
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não existe');
    }

    const hashValid = await bcrypt.compare(password, user.password);

    if (!hashValid) {
      throw new UnauthorizedException('Senha inválida');
    }

    delete user.password;
    return {
      token: this.jwt.sign({ email }),
      user,
    };
  }
}

