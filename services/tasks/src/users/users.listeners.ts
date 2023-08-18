import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { UserRole } from "@prisma/client";

type User = {
    public_uuid: string;
    username: string;
    role: string;
}

@Controller()
export class UsersListeners {
    private readonly logger = new Logger('UsersListener');

    constructor(private readonly usersService: UsersService) {
    }

    @MessagePattern('users.created')
    created(@Payload() msg: User) {
        this.logger.log(`User created: ${JSON.stringify(msg)}`);
        this.usersService.createUser({
            data: {
                public_uuid: msg.public_uuid,
                username: msg.username,
                role: msg.role as UserRole,
            }
        });
    }

    @MessagePattern('users.updated')
    updated(@Payload() msg: User) {
        this.logger.log(`User updated: ${JSON.stringify(msg)}`);
        this.usersService.updateUser({
            where: {
                public_uuid: msg.public_uuid,
            },
            data: {
                public_uuid: msg.public_uuid,
                username: msg.username,
                role: msg.role as UserRole,
            }
        });
    }
}