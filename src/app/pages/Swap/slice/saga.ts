import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { spicySwapActions as actions } from '.';
import { GetPoolProps, GetTokenProps, SpicySwapErrorType } from './types';
import { calculateDayAgg, calculateHourAgg } from 'utils/spicy';
import { transformPoolMetrics, transformPools, transformTokens } from './util';

const SPICY_API = 'https://spicyb.sdaotools.xyz/api/rest';

export function* getTokens({ transformTokens }: GetTokenProps) {
  const requestURL = `${SPICY_API}/TokenList?day_agg_start=${calculateDayAgg()}`;

  try {
    // Call our request helper (see 'utils/request')
    const { tokens } = yield call(request, requestURL);

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

export function* getPools({ transformPools }: GetPoolProps) {
  const requestURL = `
    ${SPICY_API}/PoolListAll?day_agg_start=${calculateDayAgg()}&hour_agg_start=${calculateHourAgg()}
  `;

  try {
    // Call our request helper (see 'utils/request')
    const { pair_info: pools } = yield call(request, requestURL);

    if (pools?.length > 0) {
      const transformedPools = transformPools(pools);
      yield put(actions.poolsLoaded(transformedPools));
    } else {
      yield put(actions.poolsError(SpicySwapErrorType.POOL_NOT_FOUND));
    }
  } catch (err: any) {
    yield put(actions.poolsError(SpicySwapErrorType.RESPONSE_ERROR));
  }
}

export function* getPoolMetrics({
  payload,
}: ReturnType<typeof actions.loadPoolMetrics>) {
  const pairId = payload;
  const requestURL = `${SPICY_API}/PoolDailyMetrics?_ilike=${pairId}`;

  try {
    // Call our request helper (see 'utils/request')
    const { pair_day_data: poolMetrics } = yield call(request, requestURL);

    if (poolMetrics?.length > 0) {
      const transformedMetrics = transformPoolMetrics(poolMetrics);
      yield put(actions.poolMetricsLoaded(transformedMetrics));
    } else {
      yield put(actions.poolsError(SpicySwapErrorType.METRICS_NOT_FOUND));
    }
  } catch (err: any) {
    yield put(actions.poolMetricsError(SpicySwapErrorType.RESPONSE_ERROR));
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
  yield takeLatest(actions.loadTokens.type, () =>
    getTokens({
      transformTokens,
    }),
  );
  yield takeLatest(actions.loadPools.type, () =>
    getPools({
      transformPools,
    }),
  );
  yield takeLatest(actions.loadPoolMetrics.type, getPoolMetrics);
}
