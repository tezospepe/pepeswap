import styled from 'styled-components/macro';

interface OnlineIndicatorProps {
  online: boolean;
}

export const OnlineIndicator = styled.span<OnlineIndicatorProps>`
  background-color: ${({ online }) => (online ? p => p.theme.text : '#fc0303')};
  border-radius: 25px;
  width: 10px;
  height: 10px;
`;
