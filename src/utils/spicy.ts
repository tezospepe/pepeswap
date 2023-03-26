import { SpicyPool } from 'types/SpicyPool';
import { SpicyToken } from 'types/SpicyToken';
import { numberToLocaleAndFix } from './helper';

/**
 * calculates an aggregate value for the day based on the current time.
 * used when querying SpicySwap's API to get accurate prices.
 * @returns number;
 */
export const calculateDayAgg = () => {
  const agg_start = new Date();
  agg_start.setDate(agg_start.getDate() - 7);
  return Math.floor(agg_start.getTime() / 1000);
};

/**
 * calculates an aggregate value for the hour based on the current time.
 * used when querying SpicySwap's API to get accurate prices.
 * @returns number;
 */
export const calculateHourAgg = () => {
  const agg_start = new Date();
  agg_start.setDate(agg_start.getDate() - 1);
  return Math.floor(agg_start.getTime() / 1000);
};

/**
 * finds corresponding token by the token tag
 * tags take the form of CONTRACT:TOKEN_ID, where TOKEN_ID == 'null' (this is a string!!) if FA1.2
 * example FA2 Tag: 'KT19ovJhcsUn4YU8Q5L3BGovKSixfbWcecEA:1'
 * example FA1.2 Tag: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV:null'
 * @returns SpicyToken;
 */
export const getTokenByTag = (tokens: SpicyToken[], tag: string) =>
  tokens.find(t => t.tag === tag);

// calculate APR for a given pool
export const calculateLPAprXtz = ({ volume, reserve }) =>
  ((volume * 0.002) / reserve) * 365 * 100;

// calculate APR for a given pool
export const calculateFarmAprXtz = ({ volume, staked }) =>
  ((volume * 0.001) / staked) * 365 * 100;

// find pool by tag in from token and to token
export const getPoolByTags = (pools: SpicyPool[], fromTag, toTag) =>
  pools?.find(
    pool =>
      (pool.fromToken.tag === fromTag || pool.fromToken.tag === toTag) &&
      (pool.toToken.tag === fromTag || pool.toToken.tag === toTag),
  );

export const calculateRate = ({ reserveFrom, reserveTo }) =>
  numberToLocaleAndFix(reserveFrom / reserveTo, 4);
