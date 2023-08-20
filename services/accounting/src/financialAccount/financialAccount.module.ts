import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { FinancialAccountService } from "./financialAccount.service";
import { UserListeners } from "./users.listeners";
import { TaskListeners } from "./tasks.listeners";

@Module({
    imports: [],
    providers: [FinancialAccountService, PrismaService],
    controllers: [
        UserListeners,
        TaskListeners,
    ]
})
export class FinancialAccountModule { }
