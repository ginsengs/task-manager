import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { UserRole } from "@prisma/client";
import { UserCreatedSchemaV1, UserCreatedSchemaV1Type } from 'schema-regestry/schemas/auth/user.created/v1';
import { UserChangedSchemaV1, UserChangedSchemaV1Type } from 'schema-regestry/schemas/auth/user.changed/v1';
import { validate } from 'schema-regestry/schemas/validate';

@Controller()
export class UsersListeners {
    private readonly logger = new Logger('UsersListener');

    constructor(private readonly usersService: UsersService) {
    }

    @MessagePattern('users.stream.created')
    created(@Payload() msg: UserCreatedSchemaV1Type) {
        // schema v1
        if (validate(UserCreatedSchemaV1, validate)) {
            this.logger.log(`User created: ${JSON.stringify(msg)}`);
            this.usersService.createUser({
                data: {
                    public_uuid: msg.data.public_uuid,
                    username: msg.data.username,
                    role: msg.data.role as UserRole,
                }
            });
        } else {
            this.logger.error('Schema for users.stream.created not valid');
        }
    }

    @MessagePattern('users.stream.updated')
    updated(@Payload() msg: UserChangedSchemaV1Type) {
        if (validate(UserChangedSchemaV1, msg)) {
            this.logger.log(`User updated: ${JSON.stringify(msg)}`);
            this.usersService.updateUser({
                where: {
                    public_uuid: msg.data.public_uuid,
                },
                data: {
                    public_uuid: msg.data.public_uuid,
                    username: msg.data.username,
                    role: msg.data.role as UserRole,
                }
            });
        }
    }
}