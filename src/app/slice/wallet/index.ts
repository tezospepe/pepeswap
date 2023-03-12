import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { WalletConnection, WalletConnectionError, WalletState } from './types';
import { AccountInfo, NetworkType } from '@airgap/beacon-sdk';
import { walletSaga } from './saga';

export const initialState: WalletState = {
  connected: false,
  account: undefined,
  network: undefined,
  error: undefined,
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connectWallet(state) {},
    walletError(state, action: PayloadAction<WalletConnectionError>) {
      state.connected = false;
      state.error = action.payload;
    },
    setConnected(state, action: PayloadAction<WalletConnection>) {
      const { connected, network } = action.payload;
      state.connected = connected;
      state.network = network;
      state.error = undefined;
    },
    setAccount(state, action: PayloadAction<AccountInfo>) {
      state.account = action.payload;
    },
    setNetwork(state, action: PayloadAction<NetworkType>) {
      state.network = action.payload;
    },
  },
});

export const { actions: walletActions, reducer } = slice;

export const useWalletSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: walletSaga });
  return { actions: slice.actions };
};
