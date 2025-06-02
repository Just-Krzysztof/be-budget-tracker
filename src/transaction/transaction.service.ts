import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Goal, Tag, TransactionType } from 'generated/prisma';
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

    return transaction;
  }
}
