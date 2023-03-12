import * as React from 'react';
import {
  UilAnalytics,
  UilUsdCircle,
  UilHome,
  UilNotebooks,
} from '@iconscout/react-unicons';
import { OnlineIndicator } from '../OnlineIndicator';
import {
  MobileNavCloseIcon,
  MobileNavItem,
  MobileNavWalletButton,
  MobileNavWrapper,
  P,
  RpcStatus,
} from './MobileNav';
import { NavPage } from './types';
import { AccountInfo } from '@airgap/beacon-sdk';

interface MobileNavProps {
  toggleModal: () => void;
  handleButtonClick: () => void;
  connected: boolean;
  account?: AccountInfo;
}

export function MobileNav({
  toggleModal,
  handleButtonClick,
  connected,
  account,
}: MobileNavProps) {
  const handleMobileNavClose = () => {
    toggleModal();
  };

  const pages: NavPage[] = [
    {
      url: '#',
      name: 'dashboard',
      alt: '',
      icon: <UilHome />,
    },
    {
      url: '#',
      name: 'swap',
      alt: '',
      icon: <UilUsdCircle />,
    },
    {
      url: '#',
      name: 'analytics',
      alt: '',
      icon: <UilAnalytics />,
    },
    {
      url: '#',
      name: 'learn',
      alt: '',
      icon: <UilNotebooks />,
    },
  ];

  return (
    <MobileNavWrapper
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <MobileNavCloseIcon onClick={handleMobileNavClose} />
      {pages.map(page => (
        <MobileNavItem
          href={page.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {page.icon}
          {page.name}
        </MobileNavItem>
      ))}
      <MobileNavItem>
        <MobileNavWalletButton onClick={handleButtonClick}>
          {connected ? account?.address : 'Connect Wallet'}
        </MobileNavWalletButton>
      </MobileNavItem>
      <RpcStatus>
        <OnlineIndicator online={true} />
        {/* replace with rpc url from wallet state */}
        <P>https://mainnet.api.tez.ie</P>
      </RpcStatus>
    </MobileNavWrapper>
  );
}
