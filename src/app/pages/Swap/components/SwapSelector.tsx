import * as React from 'react';
import styled from 'styled-components';
import { UilScroll } from '@iconscout/react-unicons';
import { SwapSelectorAsset } from './SwapSelectorAsset';

export function SwapSelector() {
  return (
    <>
      <SwapSelection>
        <SwapSelectorAsset />
        <SwapInput />
      </SwapSelection>
      <UilScroll color="#ffffff" style={{ cursor: 'pointer' }} />
      <SwapSelection>
        <SwapSelectorAsset />
        <SwapInput />
      </SwapSelection>
    </>
  );
}

const SwapSelection = styled.div`
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
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 8px;
  color: #ffffff;
  gap: 6px;
`;

const SwapInput = styled.input`
  height: 45px;
  width: 60%;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  outline: none;
  border: none;
  color: ${p => p.theme.textSecondary};
  text-align: right;
  font-size: 18px;
  padding: 15px;
`;
