import { Tag } from 'generated/prisma';

export interface IGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount?: number;
  currency: string;
  deadline: Date | null;
  tags: Tag[];
}

export interface IGoalListResponse {
  goals: IGoal[];
  total: number;
}
