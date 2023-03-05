import styled from 'styled-components';
import { SwapTokenIcon } from '../SwapTokenIcon';
import { UilScroll, UilAngleDown } from '@iconscout/react-unicons';

export const SwapSelection = styled.div`
  width: 97%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${p =>
    p.theme.background.replace(
      /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
      'rgba$1,0.45)',
    )};

  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 1px 2px 2px;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 8px;
  color: #ffffff;
  gap: 6px;
`;

export const SwapSelectionAmountInput = styled.input`
  height: 45px;
  min-width: 80px;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  outline: none;
  border: none;
  color: ${p => p.theme.textSecondary};
  text-align: right;
  font-size: 16px;
  padding: 15px;
`;

export const SwapSelectionAsset = styled.div`
  display: flex;
  padding-left: 4px;
  gap: 4px;
  align-items: center;
  border-radius: 5px;
  padding: 8px;
  min-width: 60px;
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
