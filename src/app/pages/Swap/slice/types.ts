import { SpicyToken } from 'types/SpicyToken';

/* --- STATE --- */
export interface SpicySwapState {
  loading: boolean;
  error?: SpicySwapErrorType | null;
  tokens: SpicyToken[];
  fromAmount?: number;
  toAmount?: number;
  fromAmountUsd?: number;
  toAmountUsd?: number;
}

export const enum SpicySwapErrorType {
  RESPONSE_ERROR = 1,
  TOKEN_NOT_FOUND = 2,
}
