import styled from 'styled-components';

export const Box = styled.div`
  border-radius: 15px;
  gap: 20px;
  padding: 10px;
  background-color: ${p => p.theme.primary};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px 0px;
`;
