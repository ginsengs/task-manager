import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UsersService, AuthController],
})
export class AppModule {}
