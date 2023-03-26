import styled from 'styled-components';
import { media } from 'styles/media';
import { UilQuestionCircle } from '@iconscout/react-unicons';

export const PoolChartContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 6fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  max-width: 400px;
  max-height: 600px;
  background-color: ${p => p.theme.background};
  border-radius: 15px;
  gap: 20px;
  padding: 10px;
  background-color: ${p => p.theme.primary};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px 0px;

  ${media.small} {
    max-height: 500px;
    max-width: 600px;
  }

  ${media.medium} {
    max-width: 800px;
  }
`;

export const PoolChartHeader = styled.div`
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

export const PoolChartHeaderDescription = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  justify-self: flex-start;
  display: flex;
  flex-direction: column;

  ${media.small} {
    max-width: 40%;
  }
`;

export const PoolChartHeaderOptions = styled.div`
  grid-area: 1 / 3 / 2 / 4;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  width: 350px;

  ${media.small} {
    padding: 0;
    gap: 20px;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const PoolChartStatistic = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 60px;
  align-items: center;
  justify-content: center;
  padding: 2px;
`;

export const PoolChart = styled.div`
  grid-area: 2 / 1 / 3 / 4;
  width: 100%;
  height: 95%;
`;

export const PoolChartFooter = styled.div`
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

  padding: 4px 0;

  ${media.small} {
    padding: 0;
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
  border-radius: 8px;

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
  justify-content: center;

  ${media.small} {
    justify-content: initial;
  }
`;

export const PoolChartTimeSelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding-top: 5px;

  ${media.small} {
    padding: 0;
  }
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

export const QuestionMarkIconSmall = styled(QuestionMarkIcon)`
  width: 18px;
  height: 18px;
`;

export const PoolChartPlaceholder = styled.div`
  min-width: 90%;
  height: 100%;
  background-color: ${p => p.theme.background};
  border-radius: 15px;
  outline: 1px solid transparent;
  animation: pulseanim 0.7s linear infinite;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);

  @keyframes pulseanim {
    0% {
      opacity: 0.9;
    }
    100% {
      opacity: 0.4;
    }
  }
`;
