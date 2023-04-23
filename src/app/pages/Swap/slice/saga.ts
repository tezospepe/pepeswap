import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { spicySwapActions as actions } from '.';
import { GetPoolProps, GetTokenProps, SpicySwapErrorType } from './types';
import {
  calculateDayAgg,
  calculateHourAgg,
  convertToMuTez,
  rawToBalance,
} from 'utils/spicy';
import { secondsFromNow } from './util';
import { transformPoolMetrics, transformPools, transformTokens } from './util';
import {
  LocalStorageService,
  StorageKeys,
} from 'app/services/local-storage-service';
import { Tezos } from 'app/services/wallet-service';
import {
  SPICY_ROUTER,
  TZKT_API_URL,
  WTZ_CONTRACT,
  WTZ_PRECISION,
  WTZ_TOKEN,
} from 'app/common/const';
import { TransactionStatus } from 'types/transaction';
import { BigNumber } from 'bignumber.js';
import { transpileModule } from 'typescript';
import { ContractMethodObject, Wallet } from '@taquito/taquito';
import {
  convertToAmountToWtz,
  unwrapXtz,
  wrapXtz,
  wtzSwapRatio,
  wtzSwapRatioTzkt,
} from '../util/wtz';

const SPICY_API = 'https://spicyb.sdaotools.xyz/api/rest';
const storageService = new LocalStorageService();

export function* getSingleTokenBalance({
  payload,
}: ReturnType<typeof actions.getSingleTokenBalance>) {
  const { userAddress, token } = payload;

  const isTezos = payload.token.symbol === 'XTZ';

  const tokenContract = token.tag.split(':')[0];
  const tokenId =
    token.tag.split(':')[1] === 'null' ? 0 : token.tag.split(':')[1];

  const requestURL = isTezos
    ? `${TZKT_API_URL}accounts/${userAddress}/balance`
    : `${TZKT_API_URL}tokens/balances?account=${userAddress}&token.contract=${tokenContract}&token.tokenId=${tokenId}`;

  const balances = yield call(request, requestURL);
  const balance = isTezos
    ? rawToBalance(Number(balances), token.decimals) || 0
    : rawToBalance(Number(balances[0]?.balance), token.decimals) || 0;

  yield put(
    actions.setUserTokenBalance({
      token,
      balance,
    }),
  );

  return balance;
}

export function* getTokenBalance({
  payload,
}: ReturnType<typeof actions.getTokenBalance>) {
  const { userAddress, pair } = payload;

  try {
    yield all(
      Object.values(pair).map(token =>
        call(() =>
          getSingleTokenBalance({
            payload: { userAddress, token },
            type: actions.getSingleTokenBalance.type,
          }),
        ),
      ),
    );
  } catch (e) {
    //todo better error handling
    console.log(e);
  }
}

export function* getTokens({ transformTokens }: GetTokenProps) {
  const requestURL = `${SPICY_API}/TokenList?day_agg_start=${calculateDayAgg()}`;

  try {
    // Call our request helper (see 'utils/request')
    const { tokens } = yield call(request, requestURL);

    if (tokens?.length > 0) {
      const transformedTokens = transformTokens(tokens);
      yield put(actions.tokensLoaded(transformedTokens));

      storageService.setItem(StorageKeys.tokenMetadata, transformedTokens);
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

  const wtzSwapRatio = yield wtzSwapRatioTzkt();

  try {
    // Call our request helper (see 'utils/request')
    const { pair_info: pools } = yield call(request, requestURL);

    if (pools?.length > 0) {
      const transformedPools = transformPools(pools, wtzSwapRatio);
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

export function* executeSwapToTez({
  payload,
}: ReturnType<typeof actions.executeSwap>) {
  const userAddress = payload.userAddress;
  const fromToken = payload.fromToken.tag.split(':');
  const toToken = payload.toToken.tag.split(':');

  try {
    const dexContract = yield Tezos.wallet.at(SPICY_ROUTER);
    const wtzContract = yield Tezos.wallet.at(WTZ_CONTRACT);
    const fromTokenContract = yield Tezos.wallet.at(fromToken[0]);

    const input = convertToMuTez(payload.fromToken, payload.fromAmount);

    const swapRatio = yield wtzSwapRatio({ wtzContract });

    const wtzOutput = convertToMuTez(
      payload.toToken,
      swapRatio.div(payload.toAmount) -
        (swapRatio.div(payload.toAmount) * payload.slippage) / 100,
    );

    const batch = yield Tezos.wallet
      .batch()
      .withContractCall(
        fromTokenContract.methods.update_operators([
          {
            add_operator: {
              owner: userAddress,
              operator: SPICY_ROUTER,
              token_id: fromToken[1],
            },
          },
        ]),
      )
      .withContractCall(
        dexContract.methodsObject.swap_exact_for_tokens({
          _to: userAddress,
          amountIn: input,
          amountOutMin: wtzOutput,
          deadline: `${secondsFromNow(300)}`,
          tokenIn: {
            fa2_address: fromToken[0],
            token_id: fromToken[1] || null,
          },
          tokenOut: {
            fa2_address: toToken[0],
            token_id: toToken[1] || null,
          },
        }),
      )
      .withContractCall(
        fromTokenContract.methods.update_operators([
          {
            remove_operator: {
              owner: userAddress,
              operator: SPICY_ROUTER,
              token_id: fromToken[1],
            },
          },
        ]),
      )
      .withContractCall(
        yield unwrapXtz({
          amount: wtzOutput,
          userAddress,
          wtzContract,
        }),
      )
      .send();

    yield batch.confirmation();

    yield put(
      actions.transactionUpdate({
        status: TransactionStatus.CONFIRMED,
        hash: batch.opHash,
        fromToken: payload.fromToken.symbol,
        toToken: payload.toToken.symbol,
        fromAmount: input,
        toAmount: wtzOutput,
      }),
    );
  } catch (e) {
    console.log(e);
    yield put(
      actions.transactionUpdate({
        status: TransactionStatus.FAILED,
        hash: '',
        fromToken: payload.fromToken.symbol,
        toToken: payload.toToken.symbol,
        fromAmount: payload.fromAmount,
        toAmount: payload.toAmount,
      }),
    );
  }
}

export function* executeTezSwap({
  payload,
}: ReturnType<typeof actions.executeSwap>) {
  const userAddress = payload.userAddress;
  const fromToken = payload.fromToken.tag.split(':');
  const toToken = payload.toToken.tag.split(':');

  try {
    const dexContract = yield Tezos.wallet.at(SPICY_ROUTER);
    const wtzContract = yield Tezos.wallet.at(WTZ_CONTRACT);
    const wtzTokenContract = yield Tezos.wallet.at(WTZ_TOKEN);
    const tezToWtzRatio = yield wtzSwapRatio({ wtzContract });

    const input = convertToMuTez(payload.fromToken, payload.fromAmount);
    const wtzOutput = Number(tezToWtzRatio.multipliedBy(input).toFixed(0));

    const output = convertToMuTez(
      payload.toToken,
      convertToAmountToWtz({
        swapRatio: tezToWtzRatio,
        amount: payload.toAmount,
      }) -
        (convertToAmountToWtz({
          swapRatio: tezToWtzRatio,
          amount: payload.toAmount,
        }) *
          payload.slippage) /
          100,
    );

    const batch = yield Tezos.wallet
      .batch()
      .withContractCall(
        yield wrapXtz({
          amount: payload.fromAmount,
          userAddress,
          swapRatio: tezToWtzRatio,
          wtzContract,
        }),
        { amount: input, mutez: true },
      )
      .withContractCall(
        wtzTokenContract.methods.update_operators([
          {
            add_operator: {
              owner: userAddress,
              operator: SPICY_ROUTER,
              token_id: fromToken[1],
            },
          },
        ]),
      )
      .withContractCall(
        dexContract.methodsObject.swap_exact_for_tokens({
          _to: userAddress,
          amountIn: wtzOutput,
          amountOutMin: output,
          deadline: `${secondsFromNow(300)}`,
          tokenIn: {
            fa2_address: fromToken[0],
            token_id: fromToken[1] || null,
          },
          tokenOut: {
            fa2_address: toToken[0],
            token_id: toToken[1] || null,
          },
        }),
      )
      .withContractCall(
        wtzTokenContract.methods.update_operators([
          {
            remove_operator: {
              owner: userAddress,
              operator: SPICY_ROUTER,
              token_id: fromToken[1],
            },
          },
        ]),
      )
      .send();

    yield batch.confirmation();

    yield put(
      actions.transactionUpdate({
        status: TransactionStatus.CONFIRMED,
        hash: batch.opHash,
        fromToken: payload.fromToken.symbol,
        toToken: payload.toToken.symbol,
        fromAmount: input,
        toAmount: output,
      }),
    );
  } catch (e) {
    console.log(e);
    yield put(
      actions.transactionUpdate({
        status: TransactionStatus.FAILED,
        hash: '',
        fromToken: payload.fromToken.symbol,
        toToken: payload.toToken.symbol,
        fromAmount: payload.fromAmount,
        toAmount: payload.toAmount,
      }),
    );
  }
}

export function* executeSwap({
  payload,
}: ReturnType<typeof actions.executeSwap>) {
  try {
    const userAddress = payload.userAddress;
    const fromToken = payload.fromToken.tag.split(':');
    const toToken = payload.toToken.tag.split(':');

    const dexContract = yield Tezos.wallet.at(SPICY_ROUTER);
    const fromTokenContract = yield Tezos.wallet.at(fromToken[0]);

    const input = convertToMuTez(payload.fromToken, payload.fromAmount);
    const output = convertToMuTez(
      payload.toToken,
      payload.toAmount - (payload.toAmount * payload.slippage) / 100,
    );

    const batch = yield Tezos.wallet
      .batch()
      .withContractCall(
        fromTokenContract.methods.update_operators([
          {
            add_operator: {
              owner: userAddress,
              operator: SPICY_ROUTER,
              token_id: fromToken[1],
            },
          },
        ]),
      )
      .withContractCall(
        dexContract.methodsObject.swap_exact_for_tokens({
          _to: userAddress,
          amountIn: input,
          amountOutMin: output,
          deadline: `${secondsFromNow(300)}`,
          tokenIn: {
            fa2_address: fromToken[0],
            token_id: fromToken[1] || null,
          },
          tokenOut: {
            fa2_address: toToken[0],
            token_id: toToken[1] || null,
          },
        }),
      )
      .withContractCall(
        fromTokenContract.methods.update_operators([
          {
            remove_operator: {
              owner: userAddress,
              operator: SPICY_ROUTER,
              token_id: fromToken[1],
            },
          },
        ]),
      )
      .send();

    yield batch.confirmation();

    yield put(
      actions.transactionUpdate({
        status: TransactionStatus.CONFIRMED,
        hash: batch.opHash,
        fromToken: payload.fromToken.symbol,
        toToken: payload.toToken.symbol,
        fromAmount: input,
        toAmount: output,
      }),
    );
  } catch (e) {
    console.log(e);
    yield put(
      actions.transactionUpdate({
        status: TransactionStatus.FAILED,
        hash: '',
        fromToken: payload.fromToken.symbol,
        toToken: payload.toToken.symbol,
        fromAmount: payload.fromAmount,
        toAmount: payload.toAmount,
      }),
    );
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
  yield takeLatest(actions.executeSwap.type, executeSwap);
  yield takeLatest(actions.executeTezSwap.type, executeTezSwap);
  yield takeLatest(actions.executeSwapToTez.type, executeSwapToTez);
  yield takeLatest(actions.loadPoolMetrics.type, getPoolMetrics);
  yield takeLatest(actions.getTokenBalance.type, getTokenBalance);
  yield takeLatest(actions.getSingleTokenBalance.type, getSingleTokenBalance);
}
