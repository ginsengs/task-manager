import { Injectable } from "@nestjs/common";
import { FinancialAccount } from "@prisma/client";
import { randomUUID } from "crypto";
import { PrismaService } from "../prisma.service";
import { TransactionService } from "./transaction/transaction.service";

@Injectable()
export class FinancialAccountService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly transactionService: TransactionService,
    ) {}

    findAccountByUser(userUuid: string): Promise<FinancialAccount> {
        return this.prisma.financialAccount.findFirstOrThrow({
            where: {
                user_uuid: userUuid,
            }
        });
    }

    deposit(account: FinancialAccount, amount: number, description?: string) {
        return this.transactionService.createOperation(account.id, amount, description);
    }

    withdraw(account: FinancialAccount, amount: number, description?: string) {
        return this.transactionService.createOperation(account.id, -amount, description);
    }

    createAccount(userUuid: string) {
        this.prisma.financialAccount.create({
            data: {
                user_uuid: userUuid,
                public_uuid: randomUUID(),
            },
        })
    }
}