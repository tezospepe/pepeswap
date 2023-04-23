import { UilSlidersVAlt } from '@iconscout/react-unicons';
import { UilSync } from '@iconscout/react-unicons';
import { A } from 'app/components/A';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import SwapWidgetTabs, { SwapWidgetTab } from '../SwapWidgetTabs';
import { selectAccount, selectConnected } from 'app/slice/wallet/selectors';
import { selectIsSwapping, selectSwapParameters } from '../../slice/selectors';
import LiquidityPanel from '../LiquidityPanel';
import { useSpicySwapSlice } from '../../slice';
import { SwapButtonContent } from '../SwapButtonContent';

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
  const account = useSelector(selectAccount);
  const swapping = useSelector(selectIsSwapping);

  const dispatch = useDispatch();
  const { actions } = useSpicySwapSlice();

  const [activeTab, setActiveTab] = useState<string>(SwapWidgetTab.Swap);
  const handleSwapClick = () => {
    if (!connected) {
      return onWalletConnect();
    } else if (!swapping && activeTab === SwapWidgetTab.Swap) {
      if (swapParameters && account) {
        if (swapParameters.fromToken.symbol === 'XTZ') {
          dispatch(
            actions.executeTezSwap({
              ...swapParameters,
              userAddress: account.address,
            }),
          );
        } else if (swapParameters.toToken.symbol === 'XTZ') {
          dispatch(
            actions.executeSwapToTez({
              ...swapParameters,
              userAddress: account.address,
            }),
          );
        } else {
          dispatch(
            actions.executeSwap({
              ...swapParameters,
              userAddress: account.address,
            }),
          );
        }
      }
    }
  };

  const handleTabChange = (tab: SwapWidgetTab | string) => {
    //todo: optimize this state management logic. it's ugly
    switch (tab) {
      case SwapWidgetTab.Liquidity:
        togglePool();
        break;
      case SwapWidgetTab.Swap:
        togglePool(false);
        break;
    }

    dispatch(actions.setFromAmount(0));
    dispatch(actions.setToAmount(0));

    setActiveTab(tab);
  };

  const isButtonDisabled = () => {
    if (!connected) {
      return false;
    }

    if (activeTab !== SwapWidgetTab.Swap) {
      return true;
    }

    if (swapParameters && swapParameters.fromAmount === 0) {
      return true;
    }

    return false;
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
            <LiquidityPanel toggleModal={toggleModal} pair={pair} />
          </SwapWidgetTabs>
          <Execute>
            <ConnectButton
              onClick={handleSwapClick}
              disabled={isButtonDisabled()}
            >
              {connected ? (
                <SwapButtonContent activeTab={activeTab as string} />
              ) : (
                'Connect'
              )}
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
                <P2>{`${(swapParameters?.slippage).toFixed(2)}%`}</P2>
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
