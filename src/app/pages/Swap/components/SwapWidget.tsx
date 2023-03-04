import React, { useEffect, useRef } from 'react';
import { UilSlidersVAlt } from '@iconscout/react-unicons';
import { UilSync } from '@iconscout/react-unicons';
import styled from 'styled-components';
import { A } from 'app/components/A';
import { SwapSelector } from './SwapSelector';
import { SwapSelectorModal } from './SwapSelectorModal';
import { useState } from 'react';
import { useSpicySwapSlice } from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTokens,
  selectLoading,
  selectError,
  selectPair,
} from '../slice/selectors';
import { SwapDirection, SwapPair } from 'types/Swap';

export function SwapWidget() {
  const { actions } = useSpicySwapSlice();

  const [modalView, setModalView] = useState(false);

  const activeSwapDir = useRef<SwapDirection>();

  const tokens = useSelector(selectTokens);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const pair = useSelector(selectPair);

  const dispatch = useDispatch();

  const toggleModal = (dir: SwapDirection) => {
    if (dir) activeSwapDir.current = dir;
    setModalView(!modalView);
  };

  const setPair = token => {
    const swapPair: SwapPair = {
      ...pair,
      [activeSwapDir.current as string]: token,
    };

    dispatch(actions.setPair(swapPair));
  };

  console.log(pair);

  const useEffectOnMount = (effect: React.EffectCallback) => {
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
            <SwapSelector toggleModal={toggleModal} pair={pair} />
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
      <SwapSelectorModal
        modalView={modalView}
        toggleModal={toggleModal}
        tokens={tokens}
        setPair={setPair}
      />
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  max-width: 400px;
  min-width: 300px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

//todo: use color from theme - shouldn't be hardcoded
const MainWidget = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 4.5fr 1fr;
  gap: 0px 0px;
  z-index: 1;
  border-radius: 15px;
  height: 300px;
  background-color: ${p => p.theme.primary};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px 0px;
`;

const SwapSubsection = styled.div`
  height: 120px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
`;

const Header = styled.div`
  grid-area: 1 / 1 / 2 / 4;
`;

const Swap = styled.div`
  grid-area: 2 / 1 / 3 / 4;
  text-align: center;
  padding-top: 10px;
  row-gap: 15px;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

const Execute = styled.div`
  grid-area: 3 / 1 / 4 / 4;
  display: inline-flex;
  justify-content: space-around;
  padding: 5px;
`;

const Options = styled.div`
  grid-area: 1 / 3 / 2 / 4;
  color: ${p => p.theme.textSecondary};
  justify-content: flex-end;
  padding: 10px;
  display: flex;
  gap: 10px;
`;

const Tabs = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  color: ${p => p.theme.textSecondary};
  padding: 10px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  height: 45px;
  gap: 10px;
`;

export const ConnectButton = styled.button`
  width: 100%;
  background: ${p => p.theme.backgroundVariant};
  border: 1px solid ${p => p.theme.backgroundVariant};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: ${p => p.theme.background};
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;

  &:hover {
    background-color: initial;
    background-position: 0 0;
    color: ${p => p.theme.backgroundVariant};
  }

  &:active {
    background-color: initial;
    background-position: 0 0;
    color: ${p => p.theme.backgroundVariant};
    opacity: 0.5;
  }
`;

const P = styled.p`
  margin: 0;
  color: ${p => p.theme.textSecondary};
  user-select: none;
  text-decoration: none;
  display: flex;
  font-size: 0.875rem;
  font-weight: 500;

  &.active {
    opacity: 1;
  }
`;

const P2 = styled(P)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;

const P3 = styled(P2)`
  opacity: 0.7;
`;

const SwapSubItem = styled.div`
  display: inline-flex;
  justify-content: space-between;
  height: 20px;
`;

export const Rate = styled(SwapSubItem)`
  grid-area: 1 / 1 / 2 / 2;
`;

export const Slippage = styled(SwapSubItem)`
  grid-area: 2 / 1 / 3 / 2;
`;

export const PriceImpact = styled(SwapSubItem)`
  grid-area: 3 / 1 / 4 / 2;
`;
