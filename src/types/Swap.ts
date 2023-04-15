import { SpicyPool } from './SpicyPool';
import { SpicyToken } from './SpicyToken';

export interface SwapPair {
  from?: SpicyToken | undefined;
  to?: SpicyToken | undefined;
  pool?: SpicyPool | undefined;
}

export type SwapDirection = 'from' | 'to';
