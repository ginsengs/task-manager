import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Task, TaskStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { EventsService } from '../events/events.service';

@Injectable()
export class TasksService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly events: EventsService,
    ) { }

    async getTask(args: Prisma.TaskFindFirstArgs) {
        return this.prisma.task.findFirst(args);
    }

    async getTasks() {
        return this.prisma.task.findMany({
            include: {
                assignee: {
                    select: {
                        public_uuid: true,
                        username: true,
                    }
                }
            }
        });
    }

    async createTask(assigneeUuid: string, description: string): Promise<Task> {
        const min = 20;
        const max = 40;

        const task = await this.prisma.task.create({
            data: {
                public_uuid: randomUUID(),
                description,
                assignee_uuid: assigneeUuid,
                price: Math.floor(Math.random() * (max - min) + min),
                status: TaskStatus.Pending,
            }
        });

        // event task created
        this.events.emit('tasks.created', task);

        return task;
    }

    async changeAssigneeForTask(taskId: number, assigneeUuid: string) {
        const task = await this.prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                assignee_uuid: assigneeUuid,
            },
        });

        this.events.emit('tasks.assigneed', task);
    }

    async shuffleTasks() {
        const tasks = await this.prisma.task.findMany({
            where: {
                status: TaskStatus.Pending,
            },
            select: {
                id: true,
            }
        });

        tasks.forEach((t) => this.events.emit('tasks.reassign', {
            taskId: t.id,
            randomAssignee: true,
        }));
    }
}
