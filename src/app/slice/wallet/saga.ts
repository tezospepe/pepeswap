import { put, takeLatest } from 'redux-saga/effects';
import { walletActions as actions } from '.';
import { WalletConnection } from './types';
import { AccountInfo, BeaconError } from '@airgap/beacon-sdk';
import { requestPermissions } from 'app/services/wallet-service';
import { beaconToWalletError } from 'utils/helper';

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

/**
 * Root saga manages watcher lifecycle
 */
export function* walletSaga() {
  // Watches for wallet connection actions and calls connectWallet when one comes in.
  yield takeLatest(actions.connectWallet.type, connectWallet);
}
