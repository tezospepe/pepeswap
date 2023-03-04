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
      <MobileNavCloseIcon onClick={handleMobileNavClose} />
      <Item href="#" target="_blank" rel="noopener noreferrer">
        <UilHome size="20" className="icon" />
        dashboard
      </Item>
      <Item href="#" target="_blank" rel="noopener noreferrer">
        <UilUsdCircle size="25" className="icon" />
        swap
      </Item>
      <Item href="#" target="_blank" rel="noopener noreferrer">
        <UilAnalytics size="25" className="icon" />
        analytics
      </Item>
      <Item href="#" target="_blank" rel="noopener noreferrer">
        <UilNotebooks size="25" className="icon" />
        learn
      </Item>
      <Item>
        <WalletButton>Connect Wallet</WalletButton>
      </Item>
      <RpcStatus>
        <OnlineIndicator online={true} />
        {/* replace with rpc url from wallet state */}
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
  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${p =>
      p.theme.background.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.75)',
      )};
  }
`;

const Item = styled(A)`
  display: flex;
  padding: 0.5rem 0;
  font-size: 1.4rem;
  font-weight: 500;
  align-items: center;

  .icon {
    margin-right: 0.25rem;
    width: 22px;
  }

  :last-of-type {
    margin-top: auto;
  }

  &:hover {
    color: ${p => p.theme.text};
    opacity: 1.5;
  }
`;

const WalletButton = styled(ConnectButton)`
  max-width: 180px;
  margin: 0.5rem 0;
  padding: 1rem 1.5rem;
`;

const P = styled.p`
  margin: 0;
  color: ${p => p.theme.textSecondary};
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
  gap: 6px;
  padding: 0.5rem 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;

const MobileNavCloseIcon = styled(UilMultiply)`
  color: ${p => p.theme.backgroundVariant};
  width: 32px;
  height: 32px;
  align-self: flex-end;
  margin-right: 16px;
  margin-bottom: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
