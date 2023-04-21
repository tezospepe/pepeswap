import { put, takeLatest } from 'redux-saga/effects';
import { walletActions as actions } from '.';
import { WalletConnection } from './types';
import { AccountInfo, BeaconError } from '@airgap/beacon-sdk';
import { requestPermissions } from '../../services/wallet-service';
import { beaconToWalletError } from 'utils/helper';
import { getActiveAccount as getAccount } from '../../services/wallet-service';

export function* connectWallet() {
  try {
    const account: AccountInfo = yield requestPermissions();
    const { type: networkType } = account.network;

    if (account) {
      const connected: WalletConnection = {
        network: networkType,
        connected: true,
      };

      yield put(actions.setAccount(account));
      yield put(actions.setConnected(connected));
    }
  } catch (err) {
    const beaconError = err as BeaconError;
    yield put(actions.walletError(beaconToWalletError(beaconError)));
  }
}

export function* getActiveAccount() {
  try {
    const account = yield getAccount();
    console.log(account);
    if (account) {
      yield put(actions.setAccount(account));
      yield put(
        actions.setConnected({
          connected: true,
          network: account.network.type,
        }),
      );
    }
  } catch (err) {
    // do nothing
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* walletSaga() {
  // Watches for wallet connection actions and calls connectWallet when one comes in.
  yield takeLatest(actions.connectWallet.type, connectWallet);
  yield takeLatest(actions.getActiveAccount.type, getActiveAccount);
}
