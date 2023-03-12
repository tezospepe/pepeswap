import * as React from 'react';
import { useState } from 'react';
import { NavLogo } from './NavLogo';
import { NavBarContent } from './NavBarContent';
import { Modal } from '../Modal';
import { MobileNav } from '../MobileNav';
import { NavBarWrapper } from './NavBar';
import { selectAccount, selectConnected } from 'app/slice/wallet/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { walletActions } from 'app/slice/wallet';

export function NavBar() {
  const dispatch = useDispatch();
  const [modalView, setModalView] = useState(false);
  const connected = useSelector(selectConnected);
  const account = useSelector(selectAccount);

  const onWalletConnect = async () => {
    dispatch(walletActions.connectWallet());
  };

  const toggleModal = () => {
    setModalView(!modalView);
  };

  const handleButtonClick = () => (connected ? false : onWalletConnect());

  return (
    <>
      <NavBarWrapper>
        <NavLogo />
        <NavBarContent
          toggleModal={toggleModal}
          handleButtonClick={handleButtonClick}
          connected={connected}
          account={account}
        />
      </NavBarWrapper>
      <Modal show={modalView} onClick={toggleModal}>
        <MobileNav
          toggleModal={toggleModal}
          handleButtonClick={handleButtonClick}
          connected={connected}
          account={account}
        />
      </Modal>
    </>
  );
}
