import * as React from 'react';
import styled from 'styled-components/macro';
import {
  UilAnalytics,
  UilUsdCircle,
  UilMoneyInsert,
  UilHome,
  UilTrowel,
  UilBars,
} from '@iconscout/react-unicons';
import { A } from '../A';
import { ConnectButton } from 'app/pages/Swap/components/SwapWidget';
import { media } from 'styles/media';
import { Modal } from '../Modal';

interface Props {
  modalView: boolean;
  toggleModal: void;
}

export function Nav<Props>({ modalView, toggleModal }) {
  const handleHamburgerClick = () => {
    toggleModal();
  };

  return (
    <>
      <Wrapper>
        <Item
          href="#"
          target="_blank"
          title="Dashboard Page"
          rel="noopener noreferrer"
        >
          <UilHome size="25" style={{ paddingRight: '5px' }} />
          Dashboard
        </Item>
        <Item
          href="#"
          target="_blank"
          title="Swap Page"
          rel="noopener noreferrer"
        >
          <UilUsdCircle size="25" style={{ paddingRight: '5px' }} />
          Swap
        </Item>
        <Item
          href="#"
          target="_blank"
          title="Analytics Page"
          rel="noopener noreferrer"
        >
          <UilAnalytics size="25" style={{ paddingRight: '5px' }} />
          Analytics
        </Item>
        <WalletButton>Connect Wallet</WalletButton>
      </Wrapper>
      <MobileWrapper>
        <HamburgerButton onClick={handleHamburgerClick}>
          <UilBars />
        </HamburgerButton>
      </MobileWrapper>
    </>
  );
}

const Wrapper = styled.nav`
  display: none;

  ${media.medium} {
    display: flex;
  } ;
`;

const MobileWrapper = styled.nav`
  display: flex;

  ${media.medium} {
    display: none;
  } ;
`;

const Item = styled(A)`
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  .icon {
    margin-right: 0.25rem;
  }

  :last-of-type {
    margin-right: 1rem;
    margin: 0 auto;
  }
`;

const WalletButton = styled(ConnectButton)`
  padding: 0 1rem;
`;

const HamburgerButton = styled(ConnectButton)`
  padding: 0 1rem;
`;
