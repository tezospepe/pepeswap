import styled from 'styled-components';

export const P = styled.p`
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

export const P2 = styled(P)`
  color: ${p => p.theme.text};
  opacity: 0.7;
`;
