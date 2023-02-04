import * as React from 'react';
import styled from 'styled-components';

export function Banner() {
  return (
    <>
      <StatList>
        <StatListItem>
          <P>TVL</P>
          <P2>187.07k ꜩ</P2>
        </StatListItem>
        <StatListItem>
          <P>Total Volume</P>
          <P2>2.82M ꜩ</P2>
        </StatListItem>
        <StatListItem>
          <P>Total Transactions</P>
          <P2>122,723</P2>
        </StatListItem>
      </StatList>
    </>
  );
}

// const P = styled.p`
//   margin: 0.625rem 0 1.5rem 0;
//   color: ${p => p.theme.textSecondary};
//   user-select: none;
//   text-decoration: none;
//   display: flex;
//   font-size: 0.875rem;
//   font-weight: 500;
// `;

const P = styled.p`
  margin: 0;
  color: ${p => p.theme.textSecondary};
  user-select: none;
  text-decoration: none;
  display: flex;
  font-size: 0.875rem;
  font-weight: 500;

  &.active {
    opacity: 1;
  }
`;

const P2 = styled(P)`
  cursor: pointer;
  color: #b8b8b8;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;

const StatList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
`;

const StatItem = styled.a`
  color: ${p => p.theme.textSecondary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .light {
    color: white;
  }
`;

const StatListItem = styled.li`
  display: inline-flex;
  margin-right: 10px;
  gap: 5px;
  text-align: center;
`;
