import { Module } from '@nestjs/common';
import { FinancialAccountModule } from './financialAccount/financialAccount.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [FinancialAccountModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
