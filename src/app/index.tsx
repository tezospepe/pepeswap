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
import { NavBar } from './components/NavBar';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - PepeSwap"
        defaultTitle="PepeSwap"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="description"
          content="PepeSwap is a next-generation DEX built on top of Genius Contracts' SpicySwap specifically for token-to-token swaps on Tezos."
        />
      </Helmet>
      <NavBar />
      <Routes>
        <Route path="/" element={<Swap />} />
        <Route path="/nft" element={<NftMarketplace />} />
        <Route path="*" element={<Swap />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
