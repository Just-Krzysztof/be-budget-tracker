import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGoalsDto } from './dto/create-goals.dto';
import { formatAmount } from 'src/transaction/utils/format.utils';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  async createGoals(data: CreateGoalsDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${data.userId} not found.`);
    }
    const targetAmount = Number(data.targetAmount.toFixed(2));

    const newGoal = await this.prisma.goal.create({
      data: {
        ...data,
        targetAmount,
      },
      select: {
        id: true,
        name: true,
        targetAmount: true,
        currency: true,
        deadline: true,
      },
    });

    return {
      ...newGoal,
      targetAmount: Number(formatAmount(Number(newGoal.targetAmount))),
    };
  }

  async updateGoalCurrentAmount(goalId: string, amount: number): Promise<void> {
    const goal = await this.prisma.goal.findUnique({
      where: { id: goalId },
    });

    if (!goal) {
      throw new NotFoundException(`Goal with ID ${goalId} not found.`);
    }

    const formattedAmount = Number(amount.toFixed(2));

    await this.prisma.goal.update({
      where: { id: goalId },
      data: {
        currentAmount: formattedAmount,
      },
    });
  }
}
