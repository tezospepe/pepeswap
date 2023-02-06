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
