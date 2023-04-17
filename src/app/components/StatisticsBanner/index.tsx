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
  position: fixed;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;
