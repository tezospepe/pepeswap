import { A } from 'app/components/A';
import { ConnectButton } from 'app/components/ConnectButton';
import styled from 'styled-components';
import { UilMultiply } from '@iconscout/react-unicons';

export const MobileNavWrapper = styled.div`
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

export const MobileNavItem = styled(A)`
  display: flex;
  padding: 0.5rem 0;
  font-size: 1.4rem;
  font-weight: 500;
  align-items: center;
  gap: 5px;

  :last-of-type {
    margin-top: auto;
  }

  &:hover {
    color: ${p => p.theme.text};
    opacity: 1.5;
  }
`;

export const MobileNavWalletButton = styled(ConnectButton)`
  max-width: 180px;
  margin: 0.5rem 0;
  padding: 1rem 1.5rem;
`;

export const MobileNavCloseIcon = styled(UilMultiply)`
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

export const RpcStatus = styled.div`
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

export const P = styled.p`
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
