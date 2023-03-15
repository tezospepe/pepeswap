/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { Swap } from './pages/Swap/Loadable';
import { useTranslation } from 'react-i18next';
import { NftMarketplace } from './pages/NftMarketplace/Loadable';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - SpicySwap"
        defaultTitle="SpicySwap"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="description"
          content="SpicySwap is a next-generation DEX built by Genius Contracts specifically for token-to-token swaps on Tezos. SpicySwap is governed by SalsaDAO ($sDAO)."
        />
      </Helmet>

      <Routes>
        <Route path="/" element={<Swap />} />
        <Route path="/nft" element={<NftMarketplace />} />
        <Route path="*" element={<Swap />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
