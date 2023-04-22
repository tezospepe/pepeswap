import { NetworkType } from '@airgap/beacon-types';
import { AccountInfo } from '@airgap/beacon-types/dist/esm/types/AccountInfo';

/* --- STATE --- */
export interface WalletState {
  connected: boolean;
  account?: AccountInfo | undefined;
  network?: NetworkType | null;
  error?: WalletConnectionError;
}

export type WalletConnection = {
  connected: boolean;
  network?: NetworkType;
};

export type WalletConnectionError = {
  name: string;
  message: string;
  title: string;
  description: string;
};
