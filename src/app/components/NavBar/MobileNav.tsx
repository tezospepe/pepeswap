import * as React from 'react';
import styled from 'styled-components';
import { A } from '../A';
import {
  UilAnalytics,
  UilUsdCircle,
  UilHome,
  UilNotebooks,
  UilMultiply,
} from '@iconscout/react-unicons';
import { ConnectButton } from 'app/pages/Swap/components/SwapWidget';
import { OnlineIndicator } from '../OnlineIndicator';

interface Props {
  toggleModal: void;
}

export function MobileNav<Props>({ toggleModal }) {
  const handleMobileNavClose = () => {
    toggleModal();
  };

  return (
    <MobileWrapper
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <MobileNavCloseIcon onClick={toggleModal} />
      <Item
        href="#"
        target="_blank"
        title="Dashboard Page"
        rel="noopener noreferrer"
      >
        <UilHome size="20" className="icon" />
        dashboard
      </Item>
      <Item
        href="#"
        target="_blank"
        title="Swap Page"
        rel="noopener noreferrer"
      >
        <UilUsdCircle style={{ marginTop: '2px' }} size="25" className="icon" />
        swap
      </Item>
      <Item
        href="#"
        target="_blank"
        title="Analytics Page"
        rel="noopener noreferrer"
      >
        <UilAnalytics size="25" className="icon" />
        analytics
      </Item>
      <WalletButton>Connect Wallet</WalletButton>
      <Item
        href="#"
        target="_blank"
        title="Analytics Page"
        rel="noopener noreferrer"
      >
        <UilNotebooks size="25" className="icon" />
        guides
      </Item>
      <RpcStatus>
        <OnlineIndicator online={true} />
        <P>https://mainnet.api.tez.ie</P>
      </RpcStatus>
    </MobileWrapper>
  );
}

const MobileWrapper = styled.div`
  height: 100%;
  max-width: 400px;
  min-width: 250px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  top: 0;
  right: 0;
  padding-top: 12px;
  padding-bottom: 20px;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
`;

const Item = styled(A)`
  display: flex;
  padding: 0.5rem 0;
  font-size: 1.35rem;
  font-weight: 500;
  align-items: center;

  .icon {
    margin-right: 0.5rem;
    width: 22px;
  }

  :last-of-type {
    margin: 0 auto;
    margin-top: auto;
  }
`;

const WalletButton = styled(ConnectButton)`
  max-width: 180px;
  margin-top: 12px;
`;

const P = styled.p`
  margin: 0;
  color: ${p => p.theme.text};
  user-select: none;
  text-decoration: none;
  display: flex;
  font-size: 0.875rem;
  font-weight: 500;

  &.active {
    opacity: 1;
  }
`;

const RpcStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const MobileNavCloseIcon = styled(UilMultiply)`
  color: ${p => p.theme.backgroundVariant};
  width: 32px;
  height: 32px;
  align-self: flex-end;
  margin-right: 24px;
  margin-bottom: 40px;
  cursor: pointer;
`;
