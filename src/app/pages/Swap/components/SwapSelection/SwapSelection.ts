import styled from 'styled-components';
import { SwapTokenIcon } from '../SwapTokenIcon';
import { UilScroll, UilAngleDown } from '@iconscout/react-unicons';
import { P } from 'app/components/P';

export const SwapSelection = styled.div`
  width: 100%;
  height: 70px;
  padding: 5px 12px;
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background-color: ${p =>
    p.theme.background.replace(
      /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
      'rgba$1,0.45)',
    )};

  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 1px 2px 2px;
  box-sizing: border-box;
  color: #ffffff;
  gap: 6px;
`;

export const SwapSelectionAmountInput = styled.input`
  grid-area: 2 / 2 / 3 / 3;
  justify-self: flex-end;
  height: 40px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  outline: none;
  border: none;
  color: ${p => p.theme.textSecondary};
  text-align: right;
  font-size: 19px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export const SwapSelectionAsset = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  padding-top: 0;
  padding-bottom: 5px;
  gap: 4px;
  align-items: center;
  border-radius: 5px;
  min-width: 60px;
  user-select: none;
`;

export const Subtext = styled(P)`
  font-size: 0.75rem;
  grid-area: 1 / 1 / 2 / 2;
  color: rgba(255, 255, 255, 0.5);
`;

export const MainText = styled(P)`
  grid-area: 2 / 1 / 3 / 2;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
`;

export const TitleText = styled(P)`
  justify-self: flex-end;
  font-size: 0.75rem;
  grid-area: 1 / 2 / 2 / 3;
  color: rgba(255, 255, 255, 0.5);
`;

export const SwapSelectionTokenIcon = styled(SwapTokenIcon)`
  margin-right: 6px;
`;

export const SwapSelectionArrowIcon = styled(UilAngleDown)`
  color: ${p => p.theme.backgroundVariant};
`;

export const SwapSelectionScrollIcon = styled(UilScroll)`
  color: ${p => p.theme.backgroundVariant};
  cursor: pointer;
`;
