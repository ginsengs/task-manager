import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { EventsService } from '../events/events.service';
import { UserChangedSchemaV1, UserChangedSchemaV1Type } from 'schema-regestry/schemas/auth/user.changed/v1';
import { validate } from 'schema-regestry/schemas/validate';

import { randomUUID } from 'crypto';
import { UserCreatedSchemaV1, UserCreatedSchemaV1Type } from 'schema-regestry/schemas/auth/user.created/v1';

@Injectable()
export class UsersService {
    private readonly logger = new Logger('UsersService');

    constructor(
        private readonly prisma: PrismaService,
        private readonly events: EventsService,
    ) { }

    async getUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({ where });
    }

    async getUsers(params: Prisma.UserFindManyArgs): Promise<User[]> {
        return this.prisma.user.findMany(params);
    }

    async findUser(where: Prisma.UserWhereInput): Promise<User | null> {
        return this.prisma.user.findFirst({ where });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const user = await this.prisma.user.create({ data });
        
        const event: UserCreatedSchemaV1Type = {
            data: {
                public_uuid: user.public_uuid,
                username: user.username,
                role: user.role,
            },
            event_id: randomUUID(),
            event_version: 1,
            event_time: new Date(),
            event_name: 'users.created',
            producer: 'auth',
        };

        if (validate(UserCreatedSchemaV1, event)) {
            this.events.emit('users.created', event);
        } else {
            this.logger.error('User schema for event users.stream.changed not valid');
        }

        return user;
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        const user = await this.prisma.user.update({
            data,
            where,
        });
        const { beak_size, ...payload } = user;

        const event: UserChangedSchemaV1Type = {
            data: {
                public_uuid: user.public_uuid,
                username: user.username,
                role: user.role,
            },
            event_id: randomUUID(),
            event_version: 1,
            event_time: new Date(),
            event_name: 'users.stream.changed',
            producer: 'auth',
        };

        if (validate(UserChangedSchemaV1, event)) {
            this.events.emit('users.stream.changed', payload);
        } else {
            this.logger.error('User schema for event users.stream.changed not valid');
        }

        return user;
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({ where });
    }
}
