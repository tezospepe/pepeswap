import { put, takeLatest } from 'redux-saga/effects';
import { walletActions as actions } from '.';
import { WalletConnection } from './types';
import { AccountInfo } from '@airgap/beacon-types/dist/esm/types/AccountInfo';
import { BeaconError } from '@airgap/beacon-core/dist/esm/errors/BeaconError';
import { requestPermissions } from '../../services/wallet-service';
import { beaconToWalletError } from 'utils/helper';
import { getActiveAccount as getAccount } from '../../services/wallet-service';
import { clearActiveAccount as clearAccount } from '../../services/wallet-service';
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

export function* clearActiveAccount() {
  try {
    yield clearAccount();
    yield put(actions.setAccount(undefined));
    yield put(
      actions.setConnected({
        connected: false,
      }),
    );
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
  yield takeLatest(actions.resetConnection.type, clearActiveAccount);
}
