import styled from 'styled-components';
import { SwapSelectionAmountInput } from '../SwapSelection/SwapSelection';
import { UilSearch } from '@iconscout/react-unicons';
import { A } from 'app/components/A';

export const SwapTokenListBox = styled.div`
  display: grid;
  background-color: ${p => p.theme.primary};
  width: 365px;
  height: 600px;
  border-radius: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 0.1fr 1fr;
  grid-row-gap: 12px;
`;

export const SwapTokenListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  padding: 12px;
`;

export const SwapTokenListHeaderIcon = styled(A)``;

export const SwapTokenListSearchIcon = styled(UilSearch)`
  position: absolute;
  z-index: 10;
  color: ${p => p.theme.backgroundVariant};
  margin-left: 10px;
`;

export const SwapTokenListSearchInput = styled(SwapSelectionAmountInput)`
  background-color: ${p => p.theme.background};
  font-size: 16px;
  text-align: left;
  padding-left: 42px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${p => p.theme.textSecondary};
  }
  :-ms-input-placeholder {
    color: ${p => p.theme.textSecondary};
  }
`;

export const SwapTokenListSearch = styled.div`
  display: flex;
  padding: 0 16px;
  align-items: center;
`;

export const SwapTokenListContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 2px;
  padding-left: 16px;
  padding-bottom: 12px;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.backgroundVariant};
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${p =>
      p.theme.backgroundVariant.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.5)',
      )};
  }
`;

export const SwapTokenListItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  max-width: 400px;
  min-height: 60px;
  background-color: ${p => p.theme.borderLight};
  border-radius: 10px;
  padding: 0 12px;
  gap: 12px;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
`;

export const SwapTokenListAssetText = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
`;

export const SwapTokenListAssetBalance = styled.div`
  margin-left: auto;
  align-self: center;
`;
