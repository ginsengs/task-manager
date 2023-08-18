import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EventsService } from './events/events.service';
import { PrismaService } from './prisma.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [HttpModule, UsersModule, TasksModule],
  providers: [EventsService],
})
export class AppModule {}
