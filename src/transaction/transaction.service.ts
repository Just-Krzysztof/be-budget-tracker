import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Goal, Tag, TransactionType, Prisma } from 'generated/prisma';
import { GetTransactionsDto } from './dto/get-transactions.dto';
@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDto) {
    let goal: Goal | null = null;
    let tag: Tag | null = null;

    const user = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (data.goalId) {
      goal = await this.prisma.goal.findUnique({
        where: {
          id: data.goalId,
        },
      });
      if (!goal) {
        throw new NotFoundException('Goal not found');
      }
      if (data.type !== TransactionType.SAVING) {
        throw new BadRequestException(
          'Goal can only be used for saving transactions',
        );
      }
    }
    if (data.tagId) {
      tag = await this.prisma.tag.findUnique({
        where: {
          id: data.tagId,
        },
      });
      if (!tag) {
        throw new NotFoundException('Tag not found');
      }
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        ...data,
      },
    });

    const year = new Date(data.date).getFullYear();
    const month = new Date(data.date).getMonth() + 1;

    const updateData = {
      incomeSum:
        data.type === TransactionType.INCOME
          ? { increment: data.amount }
          : undefined,
      expenseSum:
        data.type === TransactionType.EXPENSE
          ? { increment: data.amount }
          : undefined,
      saveSum:
        data.type === TransactionType.SAVING
          ? { increment: data.amount }
          : undefined,
    };

    await this.prisma.monthlySummary.upsert({
      where: {
        userId_month_year_currency: {
          userId: data.userId,
          month,
          year,
          currency: data.currency,
        },
      },
      create: {
        userId: data.userId,
        month,
        year,
        currency: data.currency,
        incomeSum: data.type === TransactionType.INCOME ? data.amount : 0,
        expenseSum: data.type === TransactionType.EXPENSE ? data.amount : 0,
        saveSum: data.type === TransactionType.SAVING ? data.amount : 0,
      },
      update: updateData,
    });

    return transaction;
  }
  async getTransactions(data: GetTransactionsDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const where: Prisma.TransactionWhereInput = { userId: data.userId };

    if (data.startDate && data.endDate) {
      where.date = { gte: data.startDate, lte: data.endDate };
    } else if (data.year && data.month) {
      const start = new Date(data.year, data.month - 1, 1, 0, 0, 0, 0);
      const end = new Date(data.year, data.month, 0, 23, 59, 59, 999);
      where.date = { gte: start, lte: end };
    }

    const transactions = await this.prisma.transaction.findMany({
      where,
      include: { tag: true, goal: true },
      orderBy: { date: 'desc' },
      skip: data.skip,
      take: data.take,
    });

    const total = await this.prisma.transaction.count({ where });
    const hasMore = total > (data.skip ?? 0) + (data.take ?? 10);

    return { transactions, total, hasMore };
  }
}
