import * as React from 'react';
import * as _ from 'lodash';
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
  selectPools,
  selectLoading,
  selectError,
  selectPair,
  selectPoolMetrics,
} from './slice/selectors';
import { useEffect, useRef, useState } from 'react';
import { SpicyToken } from 'types/SpicyToken';
import { getPoolByTags } from 'utils/spicy';
import PoolChart from 'app/components/PoolChart';
import { constructPair } from './util/pair';
import { defaultPairList } from 'app/common/const';
import {
  LocalStorageService,
  StorageKeys,
} from 'app/services/local-storage-service';

export function Swap() {
  const dispatch = useDispatch();
  const storageService = new LocalStorageService();

  const { actions } = useSpicySwapSlice();
  const { actions: walletActions } = useWalletSlice();

  const tokens = useSelector(selectTokens);
  const pools = useSelector(selectPools);
  const poolMetrics = useSelector(selectPoolMetrics);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const pair = useSelector(selectPair);

  const [modalView, setModalView] = useState(false);
  const [limitView, setLimitView] = useState(false);
  const [poolView, setPoolView] = useState(false);

  const activeSwapDir = useRef<SwapDirection>();

  const toggleLimit = (show: boolean = true) => setLimitView(show);
  const togglePool = (show: boolean = true) => setPoolView(show);

  const toggleModal = (dir?: SwapDirection) => {
    if (dir) activeSwapDir.current = dir;
    setModalView(!modalView);
  };

  const onWalletConnect = async () => {
    dispatch(walletActions.connectWallet());
  };

  const setPair = (token: SpicyToken) => {
    const swapPair: SwapPair = {
      ...pair,
      [activeSwapDir.current as string]: token,
    };
    dispatch(actions.setPair(swapPair));
  };

  useEffect(() => {
    const localTokenMetadata = storageService.getItem<SpicyToken[]>(
      StorageKeys.tokenMetadata,
    );

    if (tokens.length === 0) {
      if (localTokenMetadata) {
        dispatch(actions.setTokens(localTokenMetadata));
      }
      dispatch(actions.loadTokens());
    }
  }, [dispatch, actions]);

  useEffect(() => {
    // When initial state does not contain pools, call api to load pools
    if (pools.length === 0) {
      dispatch(actions.loadPools());
    }
  }, [dispatch, actions]);

  useEffect(() => {
    if (pools.length && pair && pair.from && pair.to) {
      const pool = getPoolByTags(pools, pair.from.tag, pair.to.tag);

      if (!_.isEqual(pool, pair.pool)) {
        dispatch(actions.setPair({ ...pair, pool }));
      }

      if (pool) {
        dispatch(actions.loadPoolMetrics(pool?.pairId));
      }
    }
  }, [pair, pools, actions, dispatch]);

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
      <Wrapper>
        <Content>
          <PriceChart
            tokens={tokens}
            pools={pools}
            metrics={poolMetrics}
            pair={pair}
            setPair={setPair}
            modalView={modalView}
            toggleModal={toggleModal}
            active={limitView}
          />
          <PoolChart
            tokens={tokens}
            pools={pools}
            metrics={poolMetrics}
            pair={pair}
            setPair={setPair}
            modalView={modalView}
            toggleModal={toggleModal}
            active={poolView}
          />
          <SwapWidget
            tokens={tokens}
            pair={pair}
            setPair={setPair}
            modalView={modalView}
            toggleModal={toggleModal}
            onWalletConnect={onWalletConnect}
            toggleLimit={toggleLimit}
            togglePool={togglePool}
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
