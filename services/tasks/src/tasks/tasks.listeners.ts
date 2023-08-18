import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "../users/users.service";
import { TasksService } from "./tasks.service";
import { Controller, Logger } from "@nestjs/common";

@Controller()
export class TasksListeners {
    private readonly logger = new Logger('TasksListeners');

    constructor(
        private readonly usersService: UsersService,
        private readonly tasksService: TasksService,
    ) { }

    @MessagePattern('tasks.reassign')
    async reassign(@Payload() msg: { taskId: number; assigneUuid?: number; randomAssignee: boolean; }) {
        this.logger.log(`Reassing msg: ${JSON.stringify(msg)}`);

        try {
            if (msg.randomAssignee) {
                const ids = await this.usersService.getIds();
                const user = ids[Math.floor(Math.random() * (ids.length - 1))];
                console.log('user', user);
                await this.tasksService.changeAssigneeForTask(msg.taskId, user.public_uuid);
                return;
            }

            throw Error('TODO: assigneUuid not suppoted');
        } catch (err) {
            this.logger.error(err);
        }
    }
}