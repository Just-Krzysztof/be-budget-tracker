import { TransactionType } from 'generated/prisma';

interface ITag {
  id: string;
  name: string;
  colorBg: string;
  colorText: string;
}

export interface IGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  deadline?: Date;
}

/**
 * Podstawowy interfejs transakcji
 */
export interface ITransaction {
  id: string;
  amount: number;
  type: TransactionType;
  tag?: ITag | null;
  goal?: IGoal | null;
  currency: string;
  description: string | null;
  date: Date | null;
}

/**
 * Interfejs odpowiedzi dla pojedynczej transakcji
 * Zawiera sformatowaną kwotę (z 2 miejscami po przecinku)
 */
// export interface ITransactionResponse extends Omit<ITransaction, 'amount'> {
//   amount: number;
// }

/**
 * Interfejs odpowiedzi dla listy transakcji
 */
export interface ITransactionListResponse {
  transactions: ITransaction[];
  total: number;
}

/**
 * Interfejs dla parametrów wyszukiwania transakcji
 */
export interface ITransactionFilters {
  userId: string;
  month?: number;
  year?: number;
  startDate?: Date;
  endDate?: Date;
}
