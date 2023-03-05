import styled from 'styled-components';

interface Props {
  show: boolean;
}

export const Modal = styled.div<Props>`
  z-index: 10;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;
