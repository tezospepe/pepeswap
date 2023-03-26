export interface Sum {
  hourlyvolumextz: number;
  hourlyvolumeusd: number;
}

export interface Aggregate {
  sum: Sum;
}

export interface PairHourData_aggregate {
  aggregate: Aggregate;
}

export interface Sum {
  dailyvolumextz: number;
  dailyvolumeusd: number;
}

export interface Aggregate {
  sum: Sum;
}

export interface PairDayData_aggregate {
  aggregate: Aggregate;
}

export interface Token_a {
  derivedxtz: number;
  derivedusd: number;
}

export interface Token_b {
  derivedxtz: number;
  derivedusd: number;
}

export interface SpicyPoolResponse {
  pair_id: number;
  reserve0: string;
  reserve1: string;
  reservextz: number;
  reserveusd: number;
  token0: string;
  token0price: number;
  token1: string;
  token1price: number;
  txcount: number;
  volumetoken0: number;
  volumetoken1: number;
  totalstakedfarmlp_v1: number;
  totalstakedfarmxtz_v1: number;
  totalstakedfarmusd_v1: number;
  totalstakedfarmlp: number;
  totalstakedfarmspi: number;
  totalstakedfarmxtzlp: number;
  totalstakedfarmxtzspi: number;
  totalstakedfarmxtz: number;
  totalstakedfarmusd: number;
  totalstakedfarmusdlp: number;
  totalstakedfarmusdspi: number;
  contract: string;
  pairHourData_aggregate: PairHourData_aggregate;
  pairDayData_aggregate: PairDayData_aggregate;
  token_a: Token_a;
  token_b: Token_b;
}
