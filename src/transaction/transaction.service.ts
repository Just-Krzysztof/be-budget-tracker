import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transation.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDto) {
    console.log('creating', data);

    return this.prisma.transaction.create({
      data,
      select: {
        id: true,
        amount: true,
        type: true,
        category: true,
        currency: true,
        description: true,
      },
    });
  }
}
