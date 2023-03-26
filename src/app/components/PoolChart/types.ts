import { SpicyPool, SpicyPoolMetric } from 'types/SpicyPool';
import { SpicyToken } from 'types/SpicyToken';
import { SwapPair, SwapDirection } from 'types/Swap';

export type PoolChartProps = {
  tokens?: SpicyToken[];
  pools?: SpicyPool[];
  metrics?: SpicyPoolMetric[] | null;
  pair?: SwapPair;
  setPair: (token: SpicyToken) => void;
  modalView: boolean;
  toggleModal: (dir?: SwapDirection) => void;
  active: boolean;
};
