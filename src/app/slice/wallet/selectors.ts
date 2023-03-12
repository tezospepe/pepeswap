import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.wallet || initialState;

export const selectConnected = createSelector(
  [selectDomain],
  walletState => walletState.connected,
);

export const selectAccount = createSelector(
  [selectDomain],
  walletState => walletState.account,
);

export const selectNetwork = createSelector(
  [selectDomain],
  walletState => walletState.network,
);
