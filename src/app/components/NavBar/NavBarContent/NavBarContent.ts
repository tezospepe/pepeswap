import styled from 'styled-components';
import { A } from 'app/components/A';
import { ConnectButton } from 'app/components/ConnectButton';
import { media } from 'styles/media';
import {
  UilAnalytics,
  UilUsdCircle,
  UilHome,
  UilBars,
} from '@iconscout/react-unicons';

export const NavWrapper = styled.nav`
  display: none;

  ${media.medium} {
    display: flex;
  } ;
`;

export const MobileNavWrapper = styled.nav`
  display: flex;

  ${media.medium} {
    display: none;
  } ;
`;

export const NavItem = styled(A)`
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
  }
`;

export const NavWalletButton = styled(ConnectButton)`
  padding: 0 1rem;
  margin-right: 2px;
`;

export const NavHamburgerButton = styled(ConnectButton)`
  padding: 0 1rem;
`;

export const NavIcon = styled.span`
  padding-right: 5px;
`;
