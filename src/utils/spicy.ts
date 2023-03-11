import { SpicyToken } from 'types/SpicyToken';

/**
 * calculates an aggregate value based on the current time.
 * used when querying SpicySwap's API to get accurate prices.
 * @returns number;
 */
export const calculateDayAgg = () => {
  const agg_start = new Date();
  agg_start.setDate(agg_start.getDate() - 7);
  return Math.floor(agg_start.getTime() / 1000);
};

/**
 * finds corresponding token by the token tag
 * tags take the form of CONTRACT:TOKEN_ID, where TOKEN_ID == 'null' (this is a string!!) if FA1.2
 * example FA2 Tag: 'KT19ovJhcsUn4YU8Q5L3BGovKSixfbWcecEA:1'
 * example FA1.2 Tag: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV:null'
 * @returns SpicyToken;
 */
export const getTokenByTag = (tokens: SpicyToken[], tag: string) => {
  return tokens.find(t => t.tag === tag);
};
