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
  const connected = useSelector(selectConnected);
  const account = useSelector(selectAccount);

  const [modalView, setModalView] = useState(false);
  const [isProfileActive, setProfileActive] = useState(false);

  const onWalletConnect = async () => {
    dispatch(walletActions.connectWallet());
  };

  const toggleModal = () => {
    setModalView(!modalView);
  };

  const handleButtonClick = () => {
    if (connected) {
      setProfileActive(!isProfileActive);
    } else {
      onWalletConnect();
    }
  };

  return (
    <>
      <NavBarWrapper>
        <NavLogo />
        <NavBarContent
          toggleModal={toggleModal}
          handleButtonClick={handleButtonClick}
          connected={connected}
          account={account}
          isProfileActive={isProfileActive}
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
