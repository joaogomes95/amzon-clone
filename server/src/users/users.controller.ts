import {
  Controller,
  Body,
  Post,
  Param,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserRole } from './enum/role.enum';
import { SimpleGuard } from 'src/auth/simple.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';


@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('create-user')
  createUser(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.USER);
  }

  @Post('create-admin')
  // @Role(UserRole.ADMIN)
  // @UseGuards(AuthGuard(), RolesGuard)
  createAdmin(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.ADMIN);
  }

  @Get('find/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Get('find')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.service.findAll();
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}