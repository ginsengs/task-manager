import { Module } from "@nestjs/common";
import { TasksListeners } from "./tasks.listeners";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { EventsService } from "../events/events.service";
import { UsersService } from "../users/users.service";
import { PrismaService } from "../prisma.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [TasksListeners, TasksController],
    providers: [
        PrismaService,
        TasksService,
        EventsService,
        UsersService,
    ],
})
export class TasksModule {

}