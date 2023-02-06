import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { SpicySwapState, SpicySwapErrorType } from './types';
import { SpicyToken } from 'types/SpicyToken';

export const initialState: SpicySwapState = {
  tokens: [],
  loading: false,
  error: null,
  fromAmount: 0,
  fromAmountUsd: 0,
};

const slice = createSlice({
  name: 'spicySwap',
  initialState,
  reducers: {
    setFromAmount(state, action: PayloadAction<number>) {
      state.fromAmount = action.payload;
    },
    setToAmount(state, action: PayloadAction<number>) {
      state.toAmount = action.payload;
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
  return { actions: slice.actions };
};
