import * as React from 'react';
import { useState } from 'react';
import { NavLogo } from './NavLogo';
import { NavBarContent } from './NavBarContent';
import { Modal } from '../Modal';
import { MobileNav } from '../MobileNav';
import { NavBarWrapper } from './NavBar';

export function NavBar() {
  const [modalView, setModalView] = useState(false);

  const toggleModal = () => {
    setModalView(!modalView);
  };

  return (
    <>
      <NavBarWrapper>
        <NavLogo />
        <NavBarContent toggleModal={toggleModal} />
      </NavBarWrapper>
      <Modal show={modalView} onClick={toggleModal}>
        <MobileNav toggleModal={toggleModal} />
      </Modal>
    </>
  );
}
