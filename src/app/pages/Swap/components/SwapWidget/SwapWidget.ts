import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  height: 100%;
  max-width: 400px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-self: flex-end;
`;

//todo: use color from theme - shouldn't be hardcoded
export const MainWidget = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 0px 0px;
  z-index: 1;
  border-radius: 15px;
  padding: 10px;
  gap: 20px;
  background-color: ${p => p.theme.primary};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px 0px;
`;

export const SwapSubsection = styled.div`
  height: 120px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
`;

export const Header = styled.div`
  grid-area: 1 / 1 / 2 / 4;
`;

export const Swap = styled.div`
  grid-area: 2 / 1 / 3 / 4;
  text-align: center;
  row-gap: 12px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

export const Execute = styled.div`
  grid-area: 3 / 1 / 4 / 4;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
`;

export const Options = styled.div`
  grid-area: 1 / 3 / 2 / 4;
  color: ${p => p.theme.textSecondary};
  justify-content: flex-end;
  display: flex;
  gap: 10px;
`;

export const Tabs = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  color: ${p => p.theme.textSecondary};
  margin-left: 5px;
  display: flex;
  height: 100%;
  gap: 10px;
`;

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
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;

export const P3 = styled(P2)`
  opacity: 0.7;
`;

export const SwapSubItem = styled.div`
  display: inline-flex;
  justify-content: space-between;
  height: 20px;
`;

export const Rate = styled(SwapSubItem)`
  grid-area: 1 / 1 / 2 / 2;
`;

export const Slippage = styled(SwapSubItem)`
  grid-area: 2 / 1 / 3 / 2;
`;

export const PriceImpact = styled(SwapSubItem)`
  grid-area: 3 / 1 / 4 / 2;
`;

export const Warning = styled.div`
  margin-top: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 62px;
  background-color: ${p => p.theme.border};
  border-radius: 14px;
`;
