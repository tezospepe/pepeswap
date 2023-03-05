import { useEffect, useRef, EffectCallback } from 'react';
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

export function SwapWidget() {
  const { actions } = useSpicySwapSlice();
  const dispatch = useDispatch();

  const [modalView, setModalView] = useState(false);
  const activeSwapDir = useRef<SwapDirection>();

  const tokens = useSelector(selectTokens);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const pair = useSelector(selectPair);

  const toggleModal = (dir?: SwapDirection) => {
    if (dir) activeSwapDir.current = dir;
    setModalView(!modalView);
  };

  const setPair = (token: SpicyToken) => {
    const swapPair: SwapPair = {
      ...pair,
      [activeSwapDir.current as string]: token,
    };
    dispatch(actions.setPair(swapPair));
  };

  const useEffectOnMount = (effect: EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    // When initial state does not contain tokens, call api to load tokens
    if (tokens.length === 0) {
      dispatch(actions.loadTokens());
    }
  });

  return (
    <>
      <Wrapper>
        <MainWidget>
          <Options>
            <A>
              <UilSlidersVAlt size="25px" />
            </A>
            <A>
              <UilSync size="25px" />
            </A>
          </Options>
          <Tabs>
            <P3 className="active" style={{ fontSize: '16px' }}>
              Swap
            </P3>
            <P3 style={{ fontSize: '16px' }}>Limit</P3>
            <P3 style={{ fontSize: '16px' }}>Liquidity</P3>
          </Tabs>
          <Swap>
            <SwapAssetSelection toggleModal={toggleModal} pair={pair} />
          </Swap>
          <Execute>
            <ConnectButton>Connect</ConnectButton>
          </Execute>
        </MainWidget>
        <SwapSubsection>
          <Rate>
            <P>Rate</P>
            <P2>1 XTZ for 0.91 sDAO</P2>
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
