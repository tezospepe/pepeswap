import * as React from 'react';
import styled from 'styled-components';
import { UilScroll, UilAngleDown } from '@iconscout/react-unicons';
import { A } from 'app/components/A';
import { SwapDirection, SwapPair } from 'types/Swap';
import { SwapTokenIcon } from './SwapTokenIcon';

interface Props {
  toggleModal: void;
  pair: SwapPair;
}

export function SwapSelector<Props>({ toggleModal, pair }) {
  const handleTokenClick = (dir: SwapDirection) => {
    toggleModal(dir);
  };

  return (
    <>
      <SwapSelection>
        <A
          onClick={() => {
            handleTokenClick('from');
          }}
        >
          <SwapAsset>
            {pair && pair.hasOwnProperty('from') ? (
              <>
                <SwapWidgetTokenIcon url={pair.from.img} />
                {pair.from.symbol}
              </>
            ) : (
              'Select Token'
            )}
            <SwapSelectIcon />
          </SwapAsset>
        </A>
        <SwapInput />
      </SwapSelection>
      <SwapScrollIcon />
      <SwapSelection>
        <A
          onClick={() => {
            handleTokenClick('to');
          }}
        >
          <SwapAsset>
            {pair && pair.hasOwnProperty('to') ? (
              <>
                <SwapWidgetTokenIcon url={pair.to.img} />
                {pair.to.symbol}
              </>
            ) : (
              'Select Token'
            )}
            <SwapSelectIcon />
          </SwapAsset>
        </A>
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

  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 1px 2px 2px;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 8px;
  color: #ffffff;
  gap: 6px;
`;

export const SwapInput = styled.input`
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

const SwapAsset = styled.div`
  display: flex;
  padding-left: 4px;
  gap: 4px;
  align-items: center;
  border-radius: 5px;
  padding: 8px;
  min-width: 60px;
`;

const SwapWidgetTokenIcon = styled(SwapTokenIcon)`
  margin-right: 6px;
`;

const SwapSelectIcon = styled(UilAngleDown)`
  color: ${p => p.theme.backgroundVariant};
`;

const SwapScrollIcon = styled(UilScroll)`
  color: ${p => p.theme.backgroundVariant};
  cursor: pointer;
`;
