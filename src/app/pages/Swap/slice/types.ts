import { SpicyPool, SpicyPoolMetric } from 'types/SpicyPool';
import { SpicyToken } from 'types/SpicyToken';
import { SwapPair } from 'types/Swap';
import { SpicyPoolResponse } from './types/pool';
import { SpicyTokenResponse } from './types/token';

/* --- STATE --- */
export interface SpicySwapState {
  loading: boolean;
  error?: SpicySwapErrorType | null;
  tokens: SpicyToken[];
  pools: SpicyPool[];
  poolMetrics: SpicyPoolMetric[] | null;
  fromAmount: number;
  toAmount: number;
  fromAmountUsd?: number;
  toAmountUsd?: number;
  pair?: SwapPair;
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
  transformPools: (pools: SpicyPoolResponse[]) => SpicyPool[];
};

export type GetPoolMetricsProps = {
  pairId: number;
};
