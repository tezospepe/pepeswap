import * as React from 'react';
import styled from 'styled-components/macro';
import { Banner } from './Banner';

export function StatisticsBanner() {
  return (
    <Wrapper>
      <Banner />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
`;
