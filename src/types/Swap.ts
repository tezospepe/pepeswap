import { SpicyPool } from './SpicyPool';
import { SpicyToken } from './SpicyToken';

export interface SwapPair {
  from?: SpicyToken | undefined;
  to?: SpicyToken | undefined;
  pool?: SpicyPool | undefined;
}

export type SwapDirection = 'from' | 'to';

export interface SwapParameters {
  fromToken: SpicyToken;
  toToken: SpicyToken;
  fromAmount: number;
  toAmount: number;
  rate: number;
  impact: number;
  slippage: number;
}
