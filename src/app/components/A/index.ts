import styled from 'styled-components/macro';

export const A = styled.a`
  color: ${p => p.theme.textSecondary};
  cursor: pointer;
  text-decoration: none;
  width: fit-content;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;
