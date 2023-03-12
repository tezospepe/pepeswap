import { useEffect, useRef } from 'react';
import { UilSlidersVAlt } from '@iconscout/react-unicons';
import { UilSync } from '@iconscout/react-unicons';
import { A } from 'app/components/A';
import { useState } from 'react';
import { useSpicySwapSlice } from '../../slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTokens,
  selectLoading,
  selectError,
  selectPair,
} from '../../slice/selectors';
import { SwapDirection, SwapPair } from 'types/Swap';
import { SwapAssetSelection } from '../SwapSelection';
import { SwapTokenList } from '../SwapTokenList';
import { SpicyToken } from 'types/SpicyToken';
import { ConnectButton } from 'app/components/ConnectButton';
import {
  Execute,
  MainWidget,
  Options,
  P,
  P2,
  P3,
  PriceImpact,
  Rate,
  Slippage,
  Swap,
  SwapSubsection,
  Tabs,
  Wrapper,
} from './SwapWidget';
import { Modal } from 'app/components/Modal';
import LimitOrderPanel from '../LimitOrderPanel';
import SwapWidgetTabs from '../SwapWidgetTabs';
import { selectConnected } from 'app/slice/wallet/selectors';

type SwapWidgetProps = {
  tokens?: SpicyToken[];
  pair?: SwapPair;
  setPair: (token: SpicyToken) => void;
  modalView: boolean;
  toggleModal: (dir?: SwapDirection) => void;
  onWalletConnect: () => void;
};

export function SwapWidget({
  tokens,
  pair,
  setPair,
  modalView,
  toggleModal,
  onWalletConnect,
}: SwapWidgetProps) {
  const connected = useSelector(selectConnected);
  const handleSwapClick = () => (connected ? false : onWalletConnect());

  return (
    <>
      <Wrapper>
        <MainWidget>
          <Options>
            <A>
              <UilSlidersVAlt />
            </A>
            <A>
              <UilSync />
            </A>
          </Options>
          <SwapWidgetTabs>
            <SwapAssetSelection toggleModal={toggleModal} pair={pair} />
            <LimitOrderPanel toggleModal={toggleModal} pair={pair} />
          </SwapWidgetTabs>
          <Execute>
            <ConnectButton onClick={handleSwapClick}>
              {connected ? 'Swap' : 'Connect'}
            </ConnectButton>
          </Execute>
        </MainWidget>
        <SwapSubsection>
          <Rate>
            <P>Rate</P>
            <P2>
              {pair?.to && pair?.from
                ? `1 ${pair?.from?.symbol} for 1 ${pair?.to?.symbol}`
                : ''}
            </P2>
          </Rate>
          <Slippage>
            <P>Slippage</P>
            <P2>0.01%</P2>
          </Slippage>
          <PriceImpact>
            <P>Impact</P>
            <P2>0.01%</P2>
          </PriceImpact>
        </SwapSubsection>
      </Wrapper>
      <Modal
        show={modalView}
        onClick={() => {
          toggleModal();
        }}
      >
        <SwapTokenList
          toggleModal={toggleModal}
          tokens={tokens}
          setPair={setPair}
        />
      </Modal>
    </>
  );
}
