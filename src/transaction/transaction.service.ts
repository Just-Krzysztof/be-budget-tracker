import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import {
  ITransaction,
  ITransactionListResponse,
} from './types/transaction.types';
import { formatAmount } from './utils/format.utils';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDto): Promise<ITransaction> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${data.userId} not found.`);
    }

    const amount = Number(data.amount.toFixed(2));

    const transaction = await this.prisma.transaction.create({
      data: {
        ...data,
        amount,
      },
      select: {
        id: true,
        amount: true,
        type: true,
        category: true,
        currency: true,
        description: true,
        data: true,
      },
    });

    return {
      ...transaction,
      amount: Number(formatAmount(Number(transaction.amount))),
    };
  }

  async getTransactions(
    params: GetTransactionsDto,
  ): Promise<ITransactionListResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: params.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${params.userId} not found.`);
    }

    let startDate: Date;
    let endDate: Date;

    if (params.month && params.year) {
      startDate = new Date(params.year, params.month - 1, 1);
      endDate = new Date(params.year, params.month, 0);
    } else if (params.startDate && params.endDate) {
      startDate = params.startDate;
      endDate = params.endDate;

      if (startDate > endDate) {
        throw new BadRequestException('Start date must be before end date');
      }
    } else if (
      !params.startDate &&
      !params.endDate &&
      !params.month &&
      !params.year
    ) {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else {
      throw new BadRequestException(
        'Please provide either month and year, or both startDate and endDate',
      );
    }

    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId: user.id,
        data: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        amount: true,
        type: true,
        category: true,
        currency: true,
        description: true,
        data: true,
      },
      orderBy: {
        data: 'desc',
      },
    });

    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      amount: Number(formatAmount(Number(transaction.amount))),
    }));

    return {
      transactions: formattedTransactions,
      total: formattedTransactions.length,
    };
  }
}
