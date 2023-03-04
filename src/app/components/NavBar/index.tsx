import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components/macro';
import { Logo } from './Logo';
import { StyleConstants } from 'styles/StyleConstants';
import { Nav } from './Nav';
import { PageWrapper } from '../PageWrapper';
import { Modal } from '../Modal';
import { MobileNav } from './MobileNav';

export function NavBar() {
  const [modalView, setModalView] = useState(false);

  const toggleModal = () => {
    setModalView(!modalView);
  };

  return (
    <>
      <Wrapper>
        <PageWrapper>
          <Logo />
          <Nav toggleModal={toggleModal} modalView={modalView} />
        </PageWrapper>
      </Wrapper>
      {/*e.stopPropagation();*/}
      <Modal show={modalView} onClick={toggleModal}>
        <MobileNav toggleModal={toggleModal} />
      </Modal>
    </>
  );
}

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${p => p.theme.background};
  z-index: 2;
  padding: 0 1.5rem;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${p =>
      p.theme.background.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.75)',
      )};
  }

  ${PageWrapper} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
