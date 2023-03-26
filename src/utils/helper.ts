import { WalletConnectionError } from 'app/slice/wallet/types';
import { MouseEvent } from 'react';
import { BeaconError } from '@airgap/beacon-sdk';

export const numberToLocaleAndFix = (number: number, precision: number) => {
  return number.toLocaleString(undefined, { maximumFractionDigits: precision });
};

export const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
};

export const beaconToWalletError = (
  error: BeaconError,
): WalletConnectionError => {
  const { name, message, title, description } = error;

  const walletError = {
    name,
    message,
    title,
    description,
  };

  return walletError;
};
