import { UilSlidersVAlt } from '@iconscout/react-unicons';
import { UilSync } from '@iconscout/react-unicons';
import { A } from 'app/components/A';
import { useState } from 'react';
import { useSelector } from 'react-redux';
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
  PriceImpact,
  Rate,
  Slippage,
  SwapSubsection,
  Warning,
  Wrapper,
} from './SwapWidget';
import { Modal } from 'app/components/Modal';
import LimitOrderPanel from '../LimitOrderPanel';
import SwapWidgetTabs, { SwapWidgetTab } from '../SwapWidgetTabs';
import { selectConnected } from 'app/slice/wallet/selectors';
import { selectSwapParameters } from '../../slice/selectors';
import LiquidityPanel from '../LiquidityPanel';

type SwapWidgetProps = {
  tokens?: SpicyToken[];
  pair?: SwapPair;
  setPair: (token: SpicyToken) => void;
  modalView: boolean;
  toggleModal: (dir?: SwapDirection) => void;
  onWalletConnect: () => void;
  toggleLimit: (show?: boolean) => void;
  togglePool: (show?: boolean) => void;
};

export function SwapWidget({
  tokens,
  pair,
  setPair,
  modalView,
  toggleModal,
  onWalletConnect,
  toggleLimit,
  togglePool,
}: SwapWidgetProps) {
  const connected = useSelector(selectConnected);
  const swapParameters = useSelector(selectSwapParameters);

  const [activeTab, setActiveTab] = useState<string>(SwapWidgetTab.Swap);
  const handleSwapClick = () => (connected ? false : onWalletConnect());

  const handleTabChange = (tab: SwapWidgetTab | string) => {
    //todo: optimize this state management logic. it's ugly
    switch (tab) {
      case SwapWidgetTab.Limit: {
        togglePool(false);
        toggleLimit();
        break;
      }

      case SwapWidgetTab.Liquidity: {
        toggleLimit(false);
        togglePool();
        break;
      }

      case SwapWidgetTab.Swap: {
        toggleLimit(false);
        togglePool(false);
      }
    }

    if (tab === SwapWidgetTab.Limit) {
      toggleLimit();
    } else {
      toggleLimit(false);
    }

    setActiveTab(tab);
  };

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
          <SwapWidgetTabs
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          >
            <SwapAssetSelection toggleModal={toggleModal} pair={pair} />
            <LimitOrderPanel toggleModal={toggleModal} pair={pair} />
            <LiquidityPanel toggleModal={toggleModal} pair={pair} />
          </SwapWidgetTabs>
          <Execute>
            <ConnectButton onClick={handleSwapClick}>
              {connected ? 'Swap' : 'Connect'}
            </ConnectButton>
            {swapParameters && swapParameters?.impact * -1 > 25 && (
              <Warning>
                <P>
                  High price impact:&nbsp;
                  {`${(swapParameters?.impact * -1).toFixed(2)}%`}
                </P>
                <P style={{ color: 'orange' }}>
                  A large portion of your trade will be lost.
                </P>
              </Warning>
            )}
          </Execute>
        </MainWidget>
        <SwapSubsection>
          {swapParameters ? (
            <>
              <Rate>
                <P>Rate</P>
                <P2>
                  {`${swapParameters?.rate.toFixed(6)} ${
                    swapParameters?.fromToken?.symbol
                  } for
                  1 ${swapParameters?.toToken?.symbol}`}
                </P2>
              </Rate>
              <Slippage>
                <P>Slippage</P>
                <P2>{`${(swapParameters?.slippage * 100).toFixed(2)}%`}</P2>
              </Slippage>
              <PriceImpact>
                <P>Impact</P>
                <P2>{`${(swapParameters?.impact * -1).toFixed(2)}%`}</P2>
              </PriceImpact>
            </>
          ) : null}
        </SwapSubsection>
      </Wrapper>
      {modalView && (
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
      )}
    </>
  );
}
