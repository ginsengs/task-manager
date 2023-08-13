import { Body, Controller, ForbiddenException, Get, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { UsersService } from "./users.service";
import { UserRole } from "@prisma/client";

type ChangeRoleDto = {
    user_uuid: string;
    role: UserRole;
};

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    users(@Query('skip') skip: number) {
        skip = skip || 0;
        return this.usersService.getUsers({
            select: {
                username: true,
                public_uuid: true,
                role: true,
                beak_size: false,
            },
            take: 50,
            skip: +skip,
        });
    }

    @Put('role')
    async changeRole(
        @Request() req: { user: { role: UserRole } },
        @Body() changeRoleDto: ChangeRoleDto
    ) {
        if (req.user.role !== UserRole.ADMIN) {
            throw new ForbiddenException('Not perms');
        }

        await this.usersService.updateUser({
            where: {
                public_uuid: changeRoleDto.user_uuid,
            },
            data: {
                role: changeRoleDto.role,
            },
        });

        return {
            status: 'ok'
        }
    }
}