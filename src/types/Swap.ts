import { SpicyPool } from './SpicyPool';
import { SpicyToken } from './SpicyToken';

export interface SwapPair {
  from?: SpicyToken | undefined;
  to?: SpicyToken | undefined;
  pool?: SpicyPool | undefined;
}

export interface SwapPairTokens {
  from: SpicyToken;
  to: SpicyToken;
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

export interface UserSwapParameters extends SwapParameters {
  userAddress: string;
}

export interface TokenBalanceRequest {
  userAddress: string;
  pair: SwapPairTokens;
}

export interface SingleTokenBalanceRequest {
  userAddress: string;
  token: SpicyToken;
}

export interface TokenBalanceResponse {
  balance?: number;
  token?: SpicyToken;
}
