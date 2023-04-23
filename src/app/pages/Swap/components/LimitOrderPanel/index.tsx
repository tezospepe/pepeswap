import React, { ChangeEvent, useState } from 'react';
import { SwapDirection, SwapPair } from 'types/Swap';
import {
  ExecutionBountyButton,
  ExecutionBountyButtons,
  LimitSelectionInput,
  Panel,
  RangeSliderSelection,
  Rate,
  Slider,
  Subtext,
  TitleText,
} from './LimitOrderPanel';
import { SwapAssetSelection } from '../SwapSelection';
import {
  SwapSelection,
  SwapSelectionAmountInput,
} from '../SwapSelection/SwapSelection';

type LimitOrderPanelProps = {
  toggleModal: (dir?: SwapDirection) => void;
  pair?: SwapPair;
};

export default function LimitOrderPanel({
  toggleModal,
  pair,
}: LimitOrderPanelProps) {
  const [swapRate, setSwapRate] = useState(1);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwapRate(Number(event.target.value));
  };

  return (
    <>
      <SwapAssetSelection
        toggleModal={toggleModal}
        pair={pair}
        showSwitch={false}
      />
      <RangeSliderSelection>
        <Subtext>Trigger Price</Subtext>
        <Rate>{swapRate}</Rate>
        <TitleText>{pair?.from?.symbol} at rate (-0.00%)</TitleText>
        <Slider
          type="range"
          value={swapRate}
          onChange={handleSliderChange}
          step="0.01"
          max="100.0000000"
          min="0.00000000"
        />
      </RangeSliderSelection>
      <RangeSliderSelection>
        <Subtext>{pair?.from?.symbol} Execution Bounty</Subtext>
        <ExecutionBountyButtons>
          <ExecutionBountyButton>0.01 (min)</ExecutionBountyButton>
          <ExecutionBountyButton>0.05 (fast)</ExecutionBountyButton>
        </ExecutionBountyButtons>
        <TitleText>Balance: 1245.22</TitleText>
        <LimitSelectionInput placeholder="0.00000000" />
      </RangeSliderSelection>
    </>
  );
}
