import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { TasksAssigneedSchemaV1, TasksAssigneedSchemaV1Type } from 'schema-regestry/schemas/tasks/assigneed/v1';
import { TasksCreatedSchemaV1, TasksCreatedSchemaV1Type } from 'schema-regestry/schemas/tasks/created/v1';
import { TasksCreatedSchemaV2, TasksCreatedSchemaV2Type } from 'schema-regestry/schemas/tasks/created/v2';
import { TasksClosedSchemaV1, TasksClosedSchemaV1Type } from 'schema-regestry/schemas/tasks/closed/v1';
import { validate } from 'schema-regestry/schemas/validate';
import { FinancialAccountService } from "./financialAccount.service";

@Controller()
export class TaskListeners {
    constructor(
        private readonly financialService: FinancialAccountService,
    ) {}

    @EventPattern('tasks.stream.created')
    async tasksStreamCreated(@Payload() msg: TasksCreatedSchemaV1Type | TasksCreatedSchemaV2Type) {
        if (validate(TasksCreatedSchemaV1, msg)) {
            this.withdraw(msg.data.assignee_uuid, msg.data.price);
        }

        // other handler
        if (validate(TasksCreatedSchemaV2, msg)) {
            this.withdraw(msg.data.assignee_uuid, msg.data.price);
        }
    }

    @EventPattern('tasks.assigneed')
    async tasksAssigneed(@Payload() msg: TasksAssigneedSchemaV1Type) {
        if (validate(TasksAssigneedSchemaV1, msg)) {
            this.withdraw(msg.data.assignee_uuid, msg.data.price);
        }
    }

    @EventPattern('tasks.closed')
    async tasksClosed(@Payload() msg: TasksClosedSchemaV1Type) {
        this.deposit(
            msg.data.assignee_uuid,
            Math.floor(Math.random() * (40 - 20) + 20),
        );
    }

    private async deposit(assigneeUuid: string, amount: number) {
        const account = await this.financialService.findAccountByUser(
            assigneeUuid
        );
        await this.financialService.deposit(
            account,
            amount,
            `Withdraw money for task [${amount}]`
        );
    }

    private async withdraw(assigneUuid: string, amount: number) {
        const account = await this.financialService.findAccountByUser(assigneUuid);
        await this.financialService.withdraw(
            account,
            amount,
            `Withdraw money for task [${amount}]`
        );
    }
}