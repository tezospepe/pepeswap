import { AccountInfo } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import {
  dappOptions,
  DEFAULT_NETWORK_TYPE,
  DEFAULT_RPC,
} from '../common/const';

export const Tezos = new TezosToolkit(DEFAULT_RPC);
export const beacon = new BeaconWallet(dappOptions);

export async function requestPermissions(): Promise<AccountInfo | undefined> {
  await beacon.requestPermissions({
    network: {
      type: DEFAULT_NETWORK_TYPE,
    },
  });

  Tezos.setWalletProvider(beacon);

  const account = await beacon.client.getActiveAccount();
  return account;
}

export async function clearActiveAccount(): Promise<boolean> {
  await beacon.clearActiveAccount();
  return true;
}
