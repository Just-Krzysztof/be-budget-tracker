import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetShortSummaryDto } from './dto/get-short-summary.dto';

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

  @Post('summary/short')
  getShortSummary(@Body() data: GetShortSummaryDto) {
    return this.transactionService.getShortSummary(data);
  }

  @Get('summary/:userId/:month/:year')
  getMonthSummary(
    @Param('userId') userId: string,
    @Param('month') month: number,
    @Param('year') year: number,
  ) {
    return this.transactionService.getMonthSummary(userId, month, year);
  }
}
