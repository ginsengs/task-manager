import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "../users/users.service";
import { TasksService } from "./tasks.service";
import { Controller, Logger } from "@nestjs/common";
import { TasksReassignSchemaV1, TasksReassignSchemaV1Type } from 'schema-regestry/schemas/tasks/reassign/v1';
import { validate } from 'schema-regestry/schemas/validate';

@Controller()
export class TasksListeners {
    private readonly logger = new Logger('TasksListeners');

    constructor(
        private readonly usersService: UsersService,
        private readonly tasksService: TasksService,
    ) { }

    @MessagePattern('tasks.reassign')
    async reassign(@Payload() msg: TasksReassignSchemaV1Type) {
        this.logger.log(`Reassing msg: ${JSON.stringify(msg)}`);

        try {
            if (validate(TasksReassignSchemaV1, msg)) {
                const ids = await this.usersService.getIds();
                const user = ids[Math.floor(Math.random() * (ids.length - 1))];
                await this.tasksService.changeAssigneeForTask(msg.data.task_uuid , user.public_uuid);
            }
        } catch (err) {
            this.logger.error(err);
        }
    }
}