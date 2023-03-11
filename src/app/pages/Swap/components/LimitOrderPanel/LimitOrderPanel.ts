import styled from 'styled-components';
import {
  SwapSelection,
  SwapSelectionAmountInput,
} from '../SwapSelection/SwapSelection';
import { P } from 'app/components/P';
import { ConnectButton } from 'app/components/ConnectButton';

export const Panel = styled.div`
  width: 100%;
`;

export const RangeSliderSelection = styled(SwapSelection)`
  padding: 5px 10px;
  padding-left: 20px;
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export const Slider = styled.input`
  grid-area: 2 / 2 / 3 / 3;
  width: 100%;
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  height: 30px; /* Specified height */
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  outline: none; /* Remove outline */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    border-radius: 10px;
    width: 20px; /* Set a specific slider handle width */
    height: 20px; /* Slider handle height */
    background: ${p => p.theme.backgroundVariant}; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
  &::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #04aa6d; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
`;

export const Subtext = styled(P)`
  font-size: 0.75rem;
  grid-area: 1 / 1 / 2 / 2;
`;

export const Rate = styled(P)`
  grid-area: 2 / 1 / 3 / 2;
  font-size: 1rem;
`;

export const TitleText = styled(P)`
  justify-self: flex-end;
  font-size: 0.75rem;
  grid-area: 1 / 2 / 2 / 3;
`;

export const LimitSelectionInput = styled(SwapSelectionAmountInput)`
  height: 100%;
  padding: 4px 12px;
  width: 140px;
  justify-self: flex-end;
  background-color: rgba(0, 0, 0, 0);
`;

export const ExecutionBountyButtons = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  gap: 6px;
`;

export const ExecutionBountyButton = styled(ConnectButton)`
  padding: 0;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 16px;
  min-height: 0px;
  height: 22px;
`;
