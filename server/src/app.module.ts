import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, MoviesModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
