import { AccountInfo, NetworkType, BeaconError } from '@airgap/beacon-sdk';

/* --- STATE --- */
export interface WalletState {
  connected: boolean;
  account?: AccountInfo | undefined;
  network?: NetworkType | null;
  error?: WalletConnectionError;
}

export type WalletConnection = {
  connected: boolean;
  network: NetworkType;
};

export type WalletConnectionError = {
  name: string;
  message: string;
  title: string;
  description: string;
};
