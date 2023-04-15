type QuoteParameters = {
  tokenFromReserve: number;
  tokenToReserve: number;
  tokenFromAmount: number;
  tradeFee?: number;
};

export const getSwapQuote = ({
  tokenFromReserve,
  tokenToReserve,
  tokenFromAmount,
  tradeFee = 0.003,
}: QuoteParameters) => {
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

  return token2Amount;
};
