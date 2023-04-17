import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoTitle = styled.div`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
`;

export const LogoDescription = styled.div`
  display: none;
  font-size: 0.875rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;

  ${media.small} {
    display: block;
  }
`;
