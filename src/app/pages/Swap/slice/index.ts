import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { spicySwapSaga } from './saga';
import { SpicySwapState, SpicySwapErrorType } from './types';
import { SpicyToken } from 'types/SpicyToken';
import { SwapPair } from 'types/Swap';
import { SpicyPool, SpicyPoolMetric } from 'types/SpicyPool';
import { defaultFrom } from 'app/common/const';

export const initialState: SpicySwapState = {
  tokens: [],
  pools: [],
  poolMetrics: null,
  loading: false,
  error: null,
  fromAmount: 0,
  fromAmountUsd: 0,
  toAmount: 0,
  toAmountUsd: 0,
  pair: { from: defaultFrom },
};

const slice = createSlice({
  name: 'spicySwap',
  initialState,
  reducers: {
    setPair(state, action: PayloadAction<SwapPair>) {
      state.pair = action.payload;
    },
    setFromAmount(state, action: PayloadAction<number>) {
      state.fromAmount = action.payload;
    },
    setToAmount(state, action: PayloadAction<number>) {
      state.toAmount = action.payload;
    },
    loadPools(state) {
      state.loading = true;
      state.error = null;
      state.pools = [];
    },
    poolsLoaded(state, action: PayloadAction<SpicyPool[]>) {
      const pools = action.payload;
      state.pools = pools;
      state.loading = false;
    },
    poolsError(state, action: PayloadAction<SpicySwapErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    loadPoolMetrics(state, action: PayloadAction<number>) {
      state.error = null;
    },
    poolMetricsLoaded(state, action: PayloadAction<SpicyPoolMetric[]>) {
      const metrics = action.payload;
      state.poolMetrics = metrics;
    },
    poolMetricsError(state, action: PayloadAction<SpicySwapErrorType>) {
      state.error = action.payload;
    },
    setTokens(state, action: PayloadAction<SpicyToken[]>) {
      state.tokens = action.payload;
    },
    loadTokens(state) {
      state.loading = true;
      state.error = null;
      state.tokens = [];
    },
    tokensLoaded(state, action: PayloadAction<SpicyToken[]>) {
      const tokens = action.payload;
      state.tokens = tokens;
      state.loading = false;
    },
    tokensError(state, action: PayloadAction<SpicySwapErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: spicySwapActions, reducer } = slice;

export const useSpicySwapSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: spicySwapSaga });
  return { actions: slice.actions };
};
