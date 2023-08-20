import { Controller, Logger } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { FinancialAccountService } from "./financialAccount.service";
import { UserCreatedSchemaV1, UserCreatedSchemaV1Type } from 'schema-regestry/schemas/auth/user.created/v1';
import { validate } from 'schema-regestry/schemas/validate';

@Controller()
export class UserListeners {
    private readonly logger = new Logger();

    constructor(private readonly financialService: FinancialAccountService) {
    }

    @EventPattern('users.stream.created')
    async userCreated(@Payload() msg: UserCreatedSchemaV1Type) {
        if (validate(UserCreatedSchemaV1, msg)) {
            await this.financialService.createAccount(msg.data.public_uuid);
            this.logger.log('Create financial account');
        }
    }
}