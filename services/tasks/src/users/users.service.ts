import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService ) {
    }

    getIds() {
        return this.prisma.user.findMany({
            select: {
                public_uuid: true,
            }
        });
    }

    async createUser(args: Prisma.UserCreateArgs) {
        const user = await this.prisma.user.create(args);
        return user;
    }

    async updateUser(args: Prisma.UserUpdateArgs) {
        return this.prisma.user.update(args);
    }
}
