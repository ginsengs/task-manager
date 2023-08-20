import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Task, TaskStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { EventsService } from '../events/events.service';
import { TasksReassignSchemaV1, TasksReassignSchemaV1Type } from 'schema-regestry/schemas/tasks/reassign/v1';
import { TasksCreatedSchemaV1 } from 'schema-regestry/schemas/tasks/created/v1';
import { TasksCreatedSchemaV2, TasksCreatedSchemaV2Type } from 'schema-regestry/schemas/tasks/created/v2';
import { validate } from 'schema-regestry/schemas/validate';

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

    async createTask(assigneeUuid: string, title: string, description: string): Promise<Task> {
        const min = 20;
        const max = 40;

        const task = await this.prisma.task.create({
            data: {
                title,
                public_uuid: randomUUID(),
                description,
                assignee_uuid: assigneeUuid,
                price: Math.floor(Math.random() * (max - min) + min),
                status: TaskStatus.Pending,
            }
        });

        const event: TasksCreatedSchemaV2Type = {
            data: {
                title,
                description,
                jira_id: task.public_uuid,
                task_uuid: task.public_uuid,
                price: task.price,
                status: task.status,
            },
            event_id: randomUUID(),
            event_version: 2,
            event_time: new Date(),
            event_name: 'tasks.stream.created',
            producer: 'tasks',
        };

        if (validate(TasksCreatedSchemaV1, event) || validate(TasksCreatedSchemaV2, event)) {
            this.events.emit('tasks.stream.created', event);
        }

        return task;
    }

    async changeAssigneeForTask(taskUuid: string, assigneeUuid: string) {
        const task = await this.prisma.task.update({
            where: {
                public_uuid: taskUuid
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
                public_uuid: true,
            }
        });

        for (const task of tasks) {
            if (!validate(TasksReassignSchemaV1, task)) {
                continue;
            }
            const event: TasksReassignSchemaV1Type = {
                data: {
                    task_uuid: task.public_uuid,
                },
                event_id: randomUUID(),
                event_version: 1,
                event_time: new Date(),
                event_name: 'tasks.reassign',
                producer: 'tasks',
            };
            this.events.emit('tasks.reassign', event);
        }
    }
}
