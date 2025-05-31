/**
 * Formatuje kwotę do 2 miejsc po przecinku
 * @param amount - kwota do sformatowania
 * @returns sformatowana kwota
 */
export const formatAmount = (amount: number): string => {
  return amount.toFixed(2);
};
