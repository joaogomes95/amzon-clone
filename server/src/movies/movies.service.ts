import { Injectable,  ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Movie } from '@prisma/client';
import { User } from ".prisma/client";


@Injectable()
export class MoviesService {
    constructor(private db: PrismaService){}

    async create(data: Prisma.MovieCreateInput): Promise<Movie>{
        const movie = await this.db.movie.create({ data });
        return movie;
    }

    async findAll(): Promise<Movie[]> {        
        const movies = await this.db.movie.findMany();        
        return movies;
    }

    async findOne(id: string): Promise<Movie> {
        const movie = await this.db.movie.findUnique({
            where: { id }, 
        });

        if (!movie) {
            throw new NotFoundException('ID não encontrado na base de dados!');
        }
        
        return movie;
    }

    async delete(id: string) {
        const movie = await this.db.movie.delete({
          where: { id },
        });
    
        if (!movie) {
          throw new NotFoundException('ID Não encontrado na base de dados');
        }
    
        
        return movie;
      }

    async likeMovie(userId: string, movieId: string): Promise<User> {
    await this.db.user.update({
        where: { id: userId },
        data: {
        movies: {
            connect: {
            id: movieId,
            },
        },
        },
    });

    return this.db.user.findUnique({
        where: { id: userId },
        include: {
        movies: true,
        },
    });
    }
    
}
