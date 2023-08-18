import { Module } from "@nestjs/common";
import { UsersListeners } from "./users.listeners";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma.service";

@Module({
    controllers: [UsersListeners],
    providers: [PrismaService, UsersService],
    exports: [UsersService],
})
export class UsersModule {}
