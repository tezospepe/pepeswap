import { NavBar } from 'app/components/NavBar';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';
import { CollectionsContainer } from './components/Collections/style';
import Collections from './components/Collections';

export function NftMarketplace() {
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
        <Collections />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  justify-items: center;
  align-items: center;
`;
