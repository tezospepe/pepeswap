import styled from 'styled-components/macro';
import { SwapSelection } from '../SwapSelection/SwapSelection';
import { P } from 'app/components/P';
import { ConnectButton } from 'app/components/ConnectButton';

export const LiquidityAmountSelection = styled(SwapSelection)`
  padding: 5px 12px;
  display: grid;
`;

export const Subtext = styled(P)`
  font-size: 0.75rem;
  grid-area: 1 / 1 / 2 / 2;
  color: rgba(255, 255, 255, 0.5);
`;

export const MainText = styled(P)`
  grid-area: 2 / 1 / 3 / 2;
  font-size: 1rem;
`;

export const TitleText = styled(P)`
  justify-self: flex-end;
  font-size: 0.75rem;
  grid-area: 1 / 2 / 2 / 3;
  color: rgba(255, 255, 255, 0.5);
`;

export const AmountSelectionButtons = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  gap: 6px;
  justify-self: flex-end;
`;

export const AmountSelectionButton = styled(ConnectButton)`
  padding: 0;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 16px;
  min-height: 0px;
  height: 22px;
  width: 38px;
`;
