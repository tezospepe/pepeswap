import { SwapPair } from 'types/Swap';

type SwapAmountParameters = {
  pair: SwapPair;
  fromAmount: number;
};

type QuoteParameters = {
  tokenFromReserve: number;
  tokenToReserve: number;
  tokenFromAmount: number;
  tradeFee?: number;
};

interface QuoteResponse {
  toAmount: number;
  priceImpact: number;
}

export const getSwapQuote = ({
  tokenFromReserve,
  tokenToReserve,
  tokenFromAmount,
  tradeFee = 0.003,
}: QuoteParameters): QuoteResponse => {
  if (tokenFromReserve < 0 || tokenToReserve < 0 || tokenFromAmount < 0) {
    throw new Error('Reserves and amounts must be non-negative');
  }

  const token1AmountAfterFee = tokenFromAmount * (1 - tradeFee);
  const newToken1Reserve = tokenFromReserve + token1AmountAfterFee;

  const newToken2Reserve =
    (tokenFromReserve * tokenToReserve) / newToken1Reserve;

  const token2Amount = tokenToReserve - newToken2Reserve;

  if (token2Amount < 0) {
    throw new Error('Calculated token2Amount is negative');
  }

  const priceBeforeTrade = tokenToReserve / tokenFromReserve;
  const priceAfterTrade = newToken2Reserve / newToken1Reserve;

  const priceImpact =
    ((priceAfterTrade - priceBeforeTrade) / priceBeforeTrade) * 100;

  return {
    toAmount: token2Amount,
    priceImpact,
  };
};

export const getSwapAmount = ({ pair, fromAmount }: SwapAmountParameters) => {
  const tokenFrom =
    pair.pool?.fromToken.tag === pair.from?.tag
      ? pair.pool?.fromToken
      : pair.pool?.toToken;

  const tokenTo =
    pair.pool?.toToken.tag === pair.to?.tag
      ? pair.pool?.toToken
      : pair.pool?.fromToken;

  const tokenFromReserve = Number(tokenFrom?.reserve);
  const tokenToReserve = Number(tokenTo?.reserve);

  return getSwapQuote({
    tokenFromReserve,
    tokenToReserve,
    tokenFromAmount: fromAmount,
  });
};
