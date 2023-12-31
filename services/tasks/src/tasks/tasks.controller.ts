import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TasksService } from './tasks.service';

type CreateTaskDto = {
    description: string;
    assignee_uuid: string;
};

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {
    }

    @Get()
    getTasks() {
        return this.taskService.getTasks();
    }

    @Put('change')
    changeTask() {

    }

    @Put('shuffle')
    shuffleTasks() {
        return this.taskService.shuffleTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto.assignee_uuid, createTaskDto.description);
    }
}
