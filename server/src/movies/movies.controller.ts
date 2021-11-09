import { Controller, Body, Post, Get, Param, Delete, UnprocessableEntityException } from '@nestjs/common';
import { Movie } from '@prisma/client'
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { Role } from 'src/auth/role.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/users/enum/role.enum';
import { User } from ".prisma/client";
import AuthUser from 'src/auth/auth-user.decorator';


@Controller('movies')
export class MoviesController {
  constructor(private service: MoviesService) {}

  @Get('/find')
  @UseGuards(AuthGuard())
    findAll(){
        return this.service.findAll();
    }
  
    @Get('find/:id')
    @UseGuards(AuthGuard())
    findOne(@Param('id') id: string): Promise<Movie>{
        return this.service.findOne(id);
    }

  @Post('create')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  createMovie(@Body() data: CreateMovieDto): Promise<Movie> {
    return this.service.create(data);
  }

  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
    delete(@Param('id') id: string): Promise<Movie> {
      return this.service.delete(id);
    }

    @Get('like/:id')
    @UseGuards(AuthGuard())
    likeMovie(
      @AuthUser() user: User,
      @Param('id') movieId: string,
    ): Promise<User> {
      const userId = user.id;
      return this.service.likeMovie(userId, movieId);
    }

}