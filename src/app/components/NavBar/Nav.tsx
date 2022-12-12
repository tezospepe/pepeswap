import * as React from 'react';
import styled from 'styled-components/macro';
import {
  UilAnalytics,
  UilUsdCircle,
  UilMoneyInsert,
  UilHome,
  UilTrowel,
} from '@iconscout/react-unicons';
import { A } from '../A';

export function Nav() {
  return (
    <Wrapper>
      <Item
        href="#"
        target="_blank"
        title="Dashboard Page"
        rel="noopener noreferrer"
      >
        <UilHome size="25" style={{ paddingRight: '5px' }} />
        Dashboard
      </Item>
      <Item
        href="#"
        target="_blank"
        title="Swap Page"
        rel="noopener noreferrer"
      >
        <UilUsdCircle size="25" style={{ paddingRight: '5px' }} />
        Swap
      </Item>
      <Item
        href="#"
        target="_blank"
        title="Liquidity Page"
        rel="noopener noreferrer"
      >
        <UilMoneyInsert size="25" style={{ paddingRight: '5px' }} />
        Liquidity
      </Item>
      <Item
        href="#"
        target="_blank"
        title="Farm Page"
        rel="noopener noreferrer"
      >
        <UilTrowel size="25" style={{ paddingRight: '5px' }} />
        Farm
      </Item>
      <Item
        href="#"
        target="_blank"
        title="Analytics Page"
        rel="noopener noreferrer"
      >
        <UilAnalytics size="25" style={{ paddingRight: '5px' }} />
        Analytics
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled(A)`
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  .icon {
    margin-right: 0.25rem;
  }
`;
