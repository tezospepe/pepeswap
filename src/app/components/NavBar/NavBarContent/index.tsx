import { UilUsdCircle, UilBars } from '@iconscout/react-unicons';
import {
  NavWrapper,
  NavItem,
  NavWalletButton,
  MobileNavWrapper,
  NavHamburgerButton,
  NavIcon,
} from './NavBarContent';
import { NavPage } from '../types';
import { AccountInfo } from '@airgap/beacon-types/dist/esm/types/AccountInfo';
import { truncateMiddle } from 'utils/user-address';

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
    toggleModal();
  };

  const pages: NavPage[] = [
    {
      url: '#',
      name: 'Swap',
      alt: 'Swap Page',
      icon: <UilUsdCircle />,
    },
  ];

  return (
    <>
      <NavWrapper>
        {pages.map((page, index) => (
          <NavItem
            key={index}
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
          {connected ? truncateMiddle(account?.address, 12) : 'Connect Wallet'}
        </NavWalletButton>
      </NavWrapper>
      <MobileNavWrapper>
        <NavHamburgerButton onClick={handleHamburgerClick}>
          <UilBars />
        </NavHamburgerButton>
      </MobileNavWrapper>
    </>
  );
}
