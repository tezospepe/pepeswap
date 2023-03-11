import styled from 'styled-components';
import { media } from 'styles/media';
import { UilQuestionCircle } from '@iconscout/react-unicons';

export const PriceChartContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 6fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  max-width: 800px;
  max-height: 600px;
  background-color: ${p => p.theme.background}
  border-radius: 15px;
  gap: 20px;
  padding: 10px;
  background-color: ${p => p.theme.primary};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px 0px;
`;

export const PriceChartHeader = styled.div`
  grid-area: 1 / 1 / 2 / 4;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 12px 20px;
  background-color: ${p =>
    p.theme.background.replace(
      /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
      'rgba$1,0.45)',
    )};
  border-radius: 12px;
  flex-direction: column;
  gap: 8px;

  ${media.small} {
    flex-direction: row;
    text-align: initial;
  }
`;

export const PriceChartHeaderDescription = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  justify-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const PriceChartHeaderOptions = styled.div`
  grid-area: 1 / 3 / 2 / 4;
  justify-self: flex-end;
  display: flex;
  padding: 8px;
  gap: 16px;
  align-items: center;
  flex-direction: column-reverse;

  ${media.medium} {
    padding: 0;
    gap: 8px;
    flex-direction: row;
  }
`;

export const PriceChart = styled.div`
  grid-area: 2 / 1 / 3 / 4;
  width: 100%;
  height: 95%;
`;

export const PriceChartFooter = styled.div`
  grid-area: 3 / 1 / 4 / 4;
  display: flex;
  background-color: ${p =>
    p.theme.background.replace(
      /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
      'rgba$1,0.45)',
    )};
  width: 100%;
  height: 100%;
  border-radius: 12px;
  gap: 8px;
  color: ${p => p.theme.text};
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
`;

export const ButtonGroup = styled.div`
  justify-self: flex-end;
  display: flex;

  &:after {
    content: '';
    clear: both;
    display: table;
  }

  ${media.medium} {
    padding-left: 12px;
  }
`;

export const Button = styled.button`
  padding: 6px;
  min-width: 30px;
  background: ${p => p.theme.backgroundVariant};
  border: 2px solid ${p => p.theme.backgroundVariant};
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: ${p => p.theme.background};
  cursor: pointer;
  font-weight: 600;

  &:not:last-child {
    border-right: none; /* Prevent double borders */
  }
  &:last-child {
    border-radius: 0px 8px 8px 0px;
  }
  &:first-child {
    border-radius: 8px 0px 0px 8px;
  }
  &:hover {
    background-color: initial;
    color: ${p => p.theme.backgroundVariant};
  }
  &:active {
    box-shadow: none;
    opacity: 0.9;
  }
  &.active {
    background-color: initial;
    color: ${p => p.theme.backgroundVariant};
  }
`;

export const HeaderPriceContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const PriceChartTimeSelection = styled.div`
  display: flex;
  gap: 8px;
`;

export const QuestionMarkIcon = styled(UilQuestionCircle)`
  width: 25px;
  height: 25px;
  margin-left: auto;
  flex: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
`;
