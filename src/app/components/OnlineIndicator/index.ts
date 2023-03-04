import styled from 'styled-components';

interface OnlineIndicatorProps {
  online: boolean;
}

export const OnlineIndicator = styled.span<OnlineIndicatorProps>`
  background-color: ${({ online }) => (online ? '#35ba30' : '#fc0303')};
  border-radius: 25px;
  width: 10px;
  height: 10px;
`;
