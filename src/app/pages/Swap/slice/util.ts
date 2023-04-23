import { WTZ_TOKEN, nonDefaultTokens } from 'app/common/const';
import { SpicyPool, SpicyPoolMetric } from 'types/SpicyPool';
import { SpicyToken } from 'types/SpicyToken';
import { calculateLPAprXtz, calculateFarmAprXtz } from 'utils/spicy';
import { isTezos } from '../util/pair';

export const transformTokens = (tokens): SpicyToken[] => {
  const transformedTokens = tokens.map(token => ({
    name: token.name,
    symbol: token.symbol,
    decimals: token.decimals,
    img: token.img,
    tag: token.tag,
    derivedXtz: token.derivedxtz,
    derivedUsd: token.derivedusd,
    totalLiquidityXtz: token.totalliquidityxtz,
    totalLiquidityUsd: token.totalliquidityusd,
  }));

  return [...nonDefaultTokens, ...transformedTokens];
};

export const transformPools = (pools, wtzSwapRatio): SpicyPool[] => {
  const transformedPools = pools.map(pool => {
    const lpApr = calculateLPAprXtz({
      volume: pool.pairHourData_aggregate.aggregate.sum.hourlyvolumextz,
      reserve: pool.reservextz,
    });
    const farmApr = calculateFarmAprXtz({
      volume: pool.pairHourData_aggregate.aggregate.sum.hourlyvolumextz,
      staked: pool.totalstakedfarmxtz,
    });

    return {
      pairId: pool.pair_id,
      contract: pool.contract,
      fromToken: {
        reserve: pool.reserve0,
        ...(isTezos(pool.token0) && {
          reserveXtz: isTezos(pool.token0)
            ? pool.reserve0 / wtzSwapRatio
            : pool.reserve0,
        }),
        tag: pool.token0,
        volume: pool.volumetoken0,
        price: {
          xtz: pool.token_a.derivedxtz,
          usd: pool.token_a.derivedusd,
        },
      },
      toToken: {
        reserve: pool.reserve1,
        ...(isTezos(pool.token1) && {
          reserveXtz: isTezos(pool.token1)
            ? pool.reserve1 / wtzSwapRatio
            : pool.reserve1,
        }),
        tag: pool.token1,
        volume: pool.volumetoken1,
        price: {
          xtz: pool.token_b.derivedxtz,
          usd: pool.token_b.derivedusd,
        },
      },
      volume: {
        hourlyVolumeXtz:
          pool.pairHourData_aggregate.aggregate.sum.hourlyvolumextz,
        hourlyVolumeUsd:
          pool.pairHourData_aggregate.aggregate.sum.hourlyvolumeusd,
      },
      totalReserveXtz: pool.reservextz,
      totalReserveUsd: pool.reserveusd,
      txCount: pool.txcount,
      lpApr,
      farmApr,
    };
  });

  return transformedPools;
};

export const transformPoolMetrics = (metrics): SpicyPoolMetric[] => {
  return metrics.map(metric => ({
    price: metric.reserve0 / metric.reserve1,
    fromReserve: metric.reserve0,
    toReserve: metric.reserve1,
    reserveXtz: metric.reservextz,
    volumeXtz: metric.dailyvolumextz,
    day: timestamptoDayMonth(new Date(metric.day)),
  }));
};

export const timestamptoDayMonth = (timestamp: Date): string => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  return `${day} ${month}`;
};

export const secondsFromNow = s => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + s);
  return Math.floor(now.getTime() / 1000);
};

export const getSwapOutput = 0;
