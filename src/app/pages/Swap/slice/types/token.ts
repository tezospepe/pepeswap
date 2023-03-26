export interface Sum {
  dailyvolumextz: number;
  dailyvolumeusd: number;
}

export interface Aggregate {
  sum: Sum;
}

export interface TokenDayData_aggregate {
  aggregate: Aggregate;
}

export interface TokenDayData {
  last_price: number;
  last_price_usd: number;
}

export interface SpicyTokenResponse {
  name: string;
  symbol: string;
  decimals: number;
  img: string;
  tag: string;
  derivedxtz: number;
  totalliquidityxtz: number;
  derivedusd: number;
  totalliquidityusd: number;
  tokenDayData_aggregate: TokenDayData_aggregate;
  tokenDayData: TokenDayData[];
}
