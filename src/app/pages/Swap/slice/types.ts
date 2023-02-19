import { SpicyToken } from 'types/SpicyToken';
import { SwapPair } from 'types/Swap';

/* --- STATE --- */
export interface SpicySwapState {
  loading: boolean;
  error?: SpicySwapErrorType | null;
  tokens: SpicyToken[];
  fromAmount?: number;
  toAmount?: number;
  fromAmountUsd?: number;
  toAmountUsd?: number;
  pair?: SwapPair;
}

export const enum SpicySwapErrorType {
  RESPONSE_ERROR = 1,
  TOKEN_NOT_FOUND = 2,
}
