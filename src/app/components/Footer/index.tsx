import * as React from 'react';
import { PageWrapper } from '../PageWrapper';
import { StyleConstants } from 'styles/StyleConstants';
import styled from 'styled-components';
import { NavLogo } from '../NavBar/NavLogo';
import { StatisticsBanner } from '../StatisticsBanner';

export function Footer() {
  return (
    <Wrapper>
      <P>a community-made demo.&nbsp;</P>
      <P2>SalsaDAO</P2>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  height: 40px;
  display: flex;
  max-width: 90%;
  background-color: ${p => p.theme.background};
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  z-index: 2;
  justify-content: center;
  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${p =>
      p.theme.background.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.75)',
      )};
  }
`;

const P = styled.p`
  margin: 0;
  color: ${p => p.theme.textSecondary};
  user-select: none;
  display: flex;
  font-size: 0.875rem;
  font-weight: 500;

  &.active {
    opacity: 1;
  }
`;

const P2 = styled(P)`
  cursor: pointer;
  color: #b8b8b8;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;
