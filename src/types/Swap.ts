import { SpicyToken } from './SpicyToken';

export interface SwapPair {
  from?: SpicyToken | undefined;
  to?: SpicyToken | undefined;
}

export type SwapDirection = 'from' | 'to';
