import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { EventsService } from '../events/events.service';

@Injectable()
export class UsersService {
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
        return this.prisma.user.create({ data });
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
        this.events.emit('users.changed', payload);

        return user;
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({ where });
    }
}
