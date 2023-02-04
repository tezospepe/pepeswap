import * as React from 'react';
import { UilAngleDown } from '@iconscout/react-unicons';
import styled from 'styled-components';
import { A } from 'app/components/A';

export function SwapSelectorAsset() {
  return (
    <A>
      <SwapAsset>
        XTZ
        <UilAngleDown color="#5a5ee6" />
      </SwapAsset>
    </A>
  );
}

const SwapAsset = styled.div`
  display: flex;
  padding-left: 4px;
  gap: 4px;
  align-items: center;
`;
