import { WTZ_CONTRACT, WTZ_PRECISION } from 'app/common/const';
import { BigNumber } from 'bignumber.js';
import { convertTezToMuTez } from 'utils/spicy';

export const wtzSwapRatio = async ({ wtzContract }) => {
  const storage = await wtzContract.storage();
  return new BigNumber(storage.swapRatio).div(WTZ_PRECISION);
};

export const wtzSwapRatioTzkt = async () => {
  const requestUrl = `https://api.tzkt.io/v1/contracts/${WTZ_CONTRACT}/storage`;

  const res = await fetch(requestUrl);
  const json = await res.json();

  return new BigNumber(json.swapRatio).div(WTZ_PRECISION).toNumber();
};

export const convertToAmountToWtz = ({ swapRatio, amount }) => {
  return Number(swapRatio.multipliedBy(amount).toFixed(0));
};

export const wrapXtz = async ({
  amount,
  userAddress,
  swapRatio,
  wtzContract,
}) => {
  const input = convertTezToMuTez(amount);
  const output = swapRatio.multipliedBy(input);

  return wtzContract.methods.wrap(userAddress);
};

export const unwrapXtz = async ({ amount, userAddress, wtzContract }) => {
  return wtzContract.methods.unwrap(amount, userAddress);
};
