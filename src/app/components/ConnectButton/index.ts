import styled from 'styled-components';

export const ConnectButton = styled.button`
  width: 100%;
  background: ${p => p.theme.backgroundVariant};
  border: 1px solid ${p => p.theme.backgroundVariant};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: ${p => p.theme.background};
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;

  &:hover {
    background-color: initial;
    background-position: 0 0;
    color: ${p => p.theme.backgroundVariant};
  }

  &:active {
    background-color: initial;
    background-position: 0 0;
    color: ${p => p.theme.backgroundVariant};
    opacity: 0.5;
  }
`;
