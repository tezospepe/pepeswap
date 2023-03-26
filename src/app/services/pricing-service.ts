import { SPICY_API_URL } from 'app/common/const';
import { SpicyTokenResponse } from 'app/pages/Swap/slice/types/token';
import { TokenPrice } from 'types/SpicyToken';
import { calculateDayAgg } from 'utils/spicy';

export const getTokenPrice = async (
  tag: string,
): Promise<TokenPrice | undefined> => {
  try {
    const req = `/TokenList?tag=${tag}&day_agg_start=${calculateDayAgg()}`;
    const res = await fetch(`${SPICY_API_URL}${req}`);

    const data: Array<SpicyTokenResponse> = await res.json();
    const derivedXtz = data[0].derivedxtz;
    const derivedUsd = data[0].derivedusd;

    return { derivedXtz, derivedUsd };
  } catch (error) {
    console.log(error);
  }
};
