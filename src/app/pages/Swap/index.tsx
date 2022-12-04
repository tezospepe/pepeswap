import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import { SwapWidget } from './components/SwapWidget';

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
      <PageWrapper>
        <SwapWidget />
      </PageWrapper>
    </>
  );
}
