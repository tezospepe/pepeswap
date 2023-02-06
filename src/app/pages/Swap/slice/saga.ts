import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { spicySwapActions as actions } from '.';
import { SpicySwapErrorType } from './types';
import { SpicyToken } from 'types/SpicyToken';

const SPICY_API = 'https://spicyb.sdaotools.xyz/api/rest';

export function* getTokens() {
  yield delay(500);
  const requestURL = `${SPICY_API}/TokenList`;

  try {
    // Call our request helper (see 'utils/request')
    const tokens = yield call(request, requestURL);

    const transformTokens = (tokens): SpicyToken[] => {
      return tokens.map(token => ({
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals,
        img: token.img,
        tag: token.tag,
        derivedXtz: token.derivedxtz,
        derivedUsd: token.derivedxtz,
        totalLiquidityXtz: token.totalliquidityxtz,
        totalLiquidityUsd: token.totalliquidityusd,
      }));
    };

    console.log(tokens);
    console.log(transformTokens(tokens));

    if (tokens?.length > 0) {
      const transformedTokens = transformTokens(tokens);
      yield put(actions.tokensLoaded(transformedTokens));
    } else {
      yield put(actions.tokensError(SpicySwapErrorType.TOKEN_NOT_FOUND));
    }
  } catch (err: any) {
    yield put(actions.tokensError(SpicySwapErrorType.RESPONSE_ERROR));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* spicySwapSaga() {
  // Watches for loadTokens actions and calls getTokens when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadTokens.type, getTokens);
}
