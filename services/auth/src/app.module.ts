import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { UsersController } from './users/users.controller';
import { EventsService } from './events/events.service';

// todo
const mostSooSecret = 'secret';

@Module({
  imports: [
    JwtModule.register({
      secret: mostSooSecret,
      signOptions: { expiresIn: '1d' }, // todo
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [UsersService, AuthService, PrismaService, EventsService],
})
export class AppModule {}
