import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import { SwapWidget } from './components/SwapWidget';
import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';
import { NavBar } from 'app/components/NavBar';
import { StatisticsBanner } from 'app/components/StatisticsBanner';

const Wrapper = styled(PageWrapper)`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Swap() {
  return (
    <>
      <Helmet>
        <title>Swap</title>
        <meta
          name="description"
          content="SpicySwap is a next-generation DEX built by Genius Contracts specifically for token-to-token swaps on Tezos. SpicySwap is governed by SalsaDAO ($sDAO)."
        />
      </Helmet>
      <NavBar />
      <StatisticsBanner />
      <Wrapper>
        <SwapWidget />
      </Wrapper>
    </>
  );
}
