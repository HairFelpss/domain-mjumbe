import { Module } from '@nestjs/common';
import { TransactionsService } from './service/transactions.service';
import { TransactionsController } from './controller/transactions.controller';
import { PagarMeProvider } from './providers/pagarMe.provider';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PagarMeProvider],
})
export class TransactionsModule {}
