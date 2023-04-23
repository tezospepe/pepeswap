import { WTZ_TOKEN } from 'app/common/const';
import { getTokenByTag } from 'utils/spicy';

export const constructPair = (tags, tokenList) => {
  const pair = {
    ...tags.map((tag, index) => {
      const token = getTokenByTag(tokenList, tag);
      return {
        ...(index === 0 && {
          from: token,
        }),
        ...(index === 1 && {
          to: token,
        }),
      };
    }),
  };

  return Object.assign({}, pair);
};

export const switchPairDirection = pair => ({
  ...pair,
  from: pair.to,
  to: pair.from,
});

export const constructSwapParameters = ({
  pair,
  fromAmount,
  toAmount,
  rate,
  impact,
  slippage = 2,
}) => ({
  fromToken: pair.from,
  toToken: pair.to,
  fromAmount,
  toAmount,
  rate,
  impact,
  slippage,
});

export const isTezos = token => token === `${WTZ_TOKEN}:0`;
