import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import { SwapWidget } from './components/SwapWidget';
import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';
import { NavBar } from 'app/components/NavBar';
import { Footer } from 'app/components/Footer';
import { media } from 'styles/media';
import PriceChart from 'app/components/PriceChart';

const Wrapper = styled(PageWrapper)`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: center;
  align-items: center;
`;

export function Swap() {
  return (
    <>
      <Helmet>
        <title>Swap</title>
        <meta
          name="description"
          content="SpicySwap is a next-generation DEX built by Genius Contracts specifically for token-to-token swaps on Tezos. 
          SpicySwap is governed by SalsaDAO ($sDAO)."
        />
      </Helmet>
      <NavBar />
      <Wrapper>
        <Content>
          <PriceChart />
          <SwapWidget />
        </Content>
        <Footer />
      </Wrapper>
    </>
  );
}

export const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 28px;
  flex-direction: column-reverse;

  ${media.medium} {
    flex-direction: row;
  }
`;
