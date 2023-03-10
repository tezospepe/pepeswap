import React from 'react';
import { SwapDirection, SwapPair } from 'types/Swap';
import { Panel } from './LimitOrderPanel';
import { SwapAssetSelection } from '../SwapSelection';

type LimitOrderPanelProps = {
  toggleModal: (dir?: SwapDirection) => void;
  pair?: SwapPair;
};

export default function LimitOrderPanel({
  toggleModal,
  pair,
}: LimitOrderPanelProps) {
  return (
    <>
      <SwapAssetSelection toggleModal={toggleModal} pair={pair} />
    </>
  );
}
