export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
}

export type Transaction = {
  status: TransactionStatus;
  hash: string;
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
};
