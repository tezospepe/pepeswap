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
  rate: number;
  toAmount: number;
  impact: number;
}

export const getSwapQuote = ({
  tokenFromReserve,
  tokenToReserve,
  tokenFromAmount,
  tradeFee = 0.003,
}: QuoteParameters): QuoteResponse => {
  if (tokenFromReserve < 0 || tokenToReserve < 0 || tokenFromAmount < 0) {
    console.error('Reserves and amounts must be non-negative');
  }

  const token1AmountAfterFee = tokenFromAmount * (1 - tradeFee);
  const newToken1Reserve = tokenFromReserve + token1AmountAfterFee;

  const newToken2Reserve =
    (tokenFromReserve * tokenToReserve) / newToken1Reserve;

  const token2Amount =
    tokenFromAmount > 0 ? tokenToReserve - newToken2Reserve : 0;

  if (token2Amount < 0) {
    console.error('Calculated token2Amount is negative');
  }

  const priceBeforeTrade = tokenFromReserve / tokenToReserve;
  const priceAfterTrade = newToken1Reserve / newToken2Reserve;

  const priceImpact =
    ((priceBeforeTrade - priceAfterTrade) / priceAfterTrade) * 100;

  return {
    rate: priceAfterTrade,
    toAmount: token2Amount,
    impact: priceImpact,
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

  const tokenFromReserve =
    pair.from?.symbol === 'XTZ'
      ? Number(tokenFrom?.reserveXtz)
      : Number(tokenFrom?.reserve);

  const tokenToReserve =
    pair.to?.symbol === 'XTZ'
      ? Number(tokenTo?.reserveXtz)
      : Number(tokenTo?.reserve);

  return getSwapQuote({
    tokenFromReserve,
    tokenToReserve,
    tokenFromAmount: fromAmount,
  });
};
