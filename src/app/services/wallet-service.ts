import { AccountInfo } from '@airgap/beacon-types/dist/esm/types/AccountInfo';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import {
  dappOptions,
  DEFAULT_NETWORK_TYPE,
  DEFAULT_RPC,
} from '../common/const';

export const Tezos = new TezosToolkit(DEFAULT_RPC);
export const beacon = new BeaconWallet(dappOptions);
Tezos.setWalletProvider(beacon);

export async function requestPermissions(): Promise<AccountInfo | undefined> {
  await beacon.requestPermissions({
    network: {
      type: DEFAULT_NETWORK_TYPE,
    },
  });

  const account = await beacon.client.getActiveAccount();
  return account;
}

export async function clearActiveAccount(): Promise<void> {
  await beacon.clearActiveAccount();
}

export async function getActiveAccount(): Promise<AccountInfo | undefined> {
  const account = await beacon.client.getActiveAccount();
  return account;
}
