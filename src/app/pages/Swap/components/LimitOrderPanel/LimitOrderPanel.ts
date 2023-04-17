import styled from 'styled-components/macro';
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
  padding: 5px 12px;
  display: grid;
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
  color: rgba(255, 255, 255, 0.5);
`;

export const Rate = styled(P)`
  grid-area: 2 / 1 / 3 / 2;
  font-size: 1rem;
`;

export const TitleText = styled(P)`
  justify-self: flex-end;
  font-size: 0.75rem;
  grid-area: 1 / 2 / 2 / 3;
  color: rgba(255, 255, 255, 0.5);
`;

export const LimitSelectionInput = styled(SwapSelectionAmountInput)`
  justify-self: flex-end;
  background-color: rgba(0, 0, 0, 0);
`;

export const ExecutionBountyButtons = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  padding: 10px 0;
  display: flex;
  gap: 6px;
`;

export const ExecutionBountyButton = styled(ConnectButton)`
  padding: 0;
  font-size: 0.75rem;
  font-weight: 600;
  width: 100%;
  min-height: 20px;
`;
