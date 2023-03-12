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
import { useWalletSlice } from 'app/slice/wallet';
import {
  selectTokens,
  selectLoading,
  selectError,
  selectPair,
} from './slice/selectors';
import { useEffect, useRef, useState } from 'react';
import { SpicyToken } from 'types/SpicyToken';
import { getTokenByTag } from 'utils/spicy';

//define default pair by contract address / tag
export const defaultPairList: string[] = [
  'KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn:0',
  'KT1K4jn23GonEmZot3pMGth7unnzZ6EaMVjY:0',
];

export function Swap() {
  const { actions } = useSpicySwapSlice();
  const { actions: walletActions } = useWalletSlice();
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

  const onWalletConnect = async () => {
    dispatch(walletActions.connectWallet());
  };

  useEffect(() => {
    // When initial state does not contain tokens, call api to load tokens
    if (tokens.length === 0) {
      dispatch(actions.loadTokens());
    }
  }, []);

  useEffect(() => {
    const constructPair = (tags, tokenList) => {
      const pair = Object.assign(
        {},
        ...tags.map((tag, index) => {
          const token = getTokenByTag(tokenList, tag);
          return {
            ...(index === 0 && {
              from: token,
            }),
            ...(index === 1 && {
              to: token,
            }),
          };
        }),
      );

      return pair;
    };

    if (!pair && tokens.length) {
      dispatch(actions.setPair(constructPair(defaultPairList, tokens)));
    }
  }, [tokens, pair]);

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
          <PriceChart
            tokens={tokens}
            pair={pair}
            setPair={setPair}
            modalView={modalView}
            toggleModal={toggleModal}
          />
          <SwapWidget
            tokens={tokens}
            pair={pair}
            setPair={setPair}
            modalView={modalView}
            toggleModal={toggleModal}
            onWalletConnect={onWalletConnect}
          />
        </Content>
        <Footer />
      </Wrapper>
    </>
  );
}

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

export const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 20px;
  gap: 28px;
  flex-direction: column-reverse;
  align-items: center;

  ${media.medium} {
    flex-direction: row;
    align-items: initial;
  }
`;
