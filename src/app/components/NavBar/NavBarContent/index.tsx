import {
  UilAnalytics,
  UilUsdCircle,
  UilHome,
  UilBars,
} from '@iconscout/react-unicons';
import {
  NavWrapper,
  NavItem,
  NavWalletButton,
  MobileNavWrapper,
  NavHamburgerButton,
  NavIcon,
} from './NavBarContent';
import { NavPage } from '../types';
import { AccountInfo } from '@airgap/beacon-sdk';
import { useState } from 'react';
import ProfileOptions from '../ProfileOptions';

type NavBarContentProps = {
  toggleModal: () => void;
  handleButtonClick: () => void;
  connected: boolean;
  account?: AccountInfo;
  isProfileActive: boolean;
};

export function NavBarContent({
  toggleModal,
  handleButtonClick,
  connected,
  account,
  isProfileActive,
}: NavBarContentProps) {
  const handleHamburgerClick = () => {
    if (connected) {
      toggleModal();
    }
  };

  const pages: NavPage[] = [
    {
      url: '#',
      name: 'Dashboard',
      alt: 'Dashboard Page',
      icon: <UilHome />,
    },
    {
      url: '#',
      name: 'Swap',
      alt: 'Swap Page',
      icon: <UilUsdCircle />,
    },
    {
      url: '#',
      name: 'Analytics',
      alt: 'Analytics Page',
      icon: <UilAnalytics />,
    },
  ];

  return (
    <>
      <NavWrapper>
        {pages.map(page => (
          <NavItem
            href={page.url}
            target="_blank"
            title={page.alt}
            rel="noopener noreferrer"
          >
            <NavIcon>{page.icon}</NavIcon>
            {page.name}
          </NavItem>
        ))}
        <NavWalletButton onClick={handleButtonClick}>
          {connected ? account?.address : 'Connect Wallet'}
        </NavWalletButton>
      </NavWrapper>
      <ProfileOptions account={account} visible={isProfileActive} />
      <MobileNavWrapper>
        <NavHamburgerButton onClick={handleHamburgerClick}>
          <UilBars />
        </NavHamburgerButton>
      </MobileNavWrapper>
    </>
  );
}
