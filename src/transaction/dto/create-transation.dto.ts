export class CreateTransactionDto {
  userId: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  currency: string;
  description?: string;
}
