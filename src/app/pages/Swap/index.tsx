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
import { useDispatch, useSelector } from 'react-redux';
import { SwapDirection, SwapPair } from 'types/Swap';
import { useSpicySwapSlice } from './slice';
import {
  selectTokens,
  selectLoading,
  selectError,
  selectPair,
} from './slice/selectors';
import { useEffect, useRef, useState } from 'react';
import { SpicyToken } from 'types/SpicyToken';

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
  const { actions } = useSpicySwapSlice();
  const dispatch = useDispatch();

  const tokens = useSelector(selectTokens);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const pair = useSelector(selectPair);

  const [modalView, setModalView] = useState(false);
  const activeSwapDir = useRef<SwapDirection>();

  const toggleModal = (dir?: SwapDirection) => {
    if (dir) activeSwapDir.current = dir;
    setModalView(!modalView);
  };

  useEffect(() => {
    // When initial state does not contain tokens, call api to load tokens
    if (tokens.length === 0) {
      dispatch(actions.loadTokens());
    }
  }, []);

  const setPair = (token: SpicyToken) => {
    const swapPair: SwapPair = {
      ...pair,
      [activeSwapDir.current as string]: token,
    };
    dispatch(actions.setPair(swapPair));
  };

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
          <SwapWidget
            tokens={tokens}
            pair={pair}
            setPair={setPair}
            modalView={modalView}
            toggleModal={toggleModal}
          />
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
