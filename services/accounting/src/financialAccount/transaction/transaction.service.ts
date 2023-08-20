import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class TransactionService {
    constructor(private readonly prisma: PrismaService) { }

    async createOperation(accountId: number, amount: number, description?: string) {
        const transaction = await this.prisma.transaction.create({
            data: {
                description: description,
                amount,
                account: {
                    connect: {
                        id: accountId,
                    },
                },
            },
        });

        return transaction;
    }
}
