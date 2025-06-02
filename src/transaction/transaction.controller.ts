import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() data: CreateTransactionDto) {
    return this.transactionService.createTransaction(data);
  }

  @Post('filter')
  getTransactions(@Body() data: GetTransactionsDto) {
    return this.transactionService.getTransactions(data);
  }
}
