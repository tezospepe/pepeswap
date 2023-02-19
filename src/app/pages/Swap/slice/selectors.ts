import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.spicySwap || initialState;

export const selectTokens = createSelector(
  [selectDomain],
  spicySwapState => spicySwapState.tokens,
);

export const selectLoading = createSelector(
  [selectDomain],
  spicySwapState => spicySwapState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  spicySwapState => spicySwapState.error,
);

export const selectPair = createSelector(
  [selectDomain],
  spicySwapState => spicySwapState.pair,
);
