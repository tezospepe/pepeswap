import { TokenPrice } from './SpicyToken';

export interface SpicyPool {
  pairId: number;
  contract: string;
  fromToken: SpicyPoolToken;
  toToken: SpicyPoolToken;
  volume: SpicyPoolVolume;
  totalReserveXtz: number;
  totalReserveUsd: number;
  txCount: number;
  lpApr: number;
  farmApr: number;
}

export interface SpicyPoolToken {
  reserve: number;
  tag: string;
  volume: number;
  price: TokenPrice;
}

export interface SpicyPoolVolume {
  hourlyVolumeXtz: number;
  hourlyVolumeUsd: number;
}

export interface SpicyPoolMetric {
  price: number;
  fromReserve: number;
  toReserve: number;
  reserveXtz: number;
  volumeXtz: number;
  day: string;
}
