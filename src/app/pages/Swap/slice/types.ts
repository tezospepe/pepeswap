import { SpicyPool, SpicyPoolMetric } from 'types/SpicyPool';
import { SpicyToken } from 'types/SpicyToken';
import { SwapPair, SwapParameters, TokenBalanceResponse } from 'types/Swap';
import { SpicyPoolResponse } from './types/pool';
import { SpicyTokenResponse } from './types/token';
import { Transaction } from 'types/transaction';

/* --- STATE --- */
export interface SpicySwapState {
  loading: boolean;
  error?: SpicySwapErrorType | null;
  tokens: SpicyToken[];
  pools: SpicyPool[];
  txLog: Transaction[];
  poolMetrics: SpicyPoolMetric[] | null;
  fromAmount: number;
  toAmount: number;
  fromAmountUsd?: number;
  toAmountUsd?: number;
  pair?: SwapPair;
  swapping: boolean;
  swap: SwapParameters | null;
  userBalance: TokenBalanceResponse[];
}

export const enum SpicySwapErrorType {
  RESPONSE_ERROR = 1,
  TOKEN_NOT_FOUND = 2,
  POOL_NOT_FOUND = 3,
  METRICS_NOT_FOUND = 4,
}

export type GetTokenProps = {
  transformTokens: (tokens: SpicyTokenResponse[]) => SpicyToken[];
};

export type GetPoolProps = {
  transformPools: (
    pools: SpicyPoolResponse[],
    wtzSwapRatio: () => Number,
  ) => SpicyPool[];
};

export type GetPoolMetricsProps = {
  pairId: number;
};
