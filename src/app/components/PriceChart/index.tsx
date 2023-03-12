import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from 'recharts';
import { HeaderText, SubHeaderText, SubHeaderTextColor } from '../HeaderText';
import {
  PriceChartContainer,
  PriceChartHeader,
  PriceChartHeaderDescription,
  HeaderPriceContainer,
  PriceChartHeaderOptions,
  PriceChartTimeSelection,
  ButtonGroup,
  Button,
  PriceChartFooter,
  QuestionMarkIcon,
  PriceChart as PriceChartBox,
  PriceChartPlaceholder,
} from './styles';
import { TimeSelectOption } from './types';
import { useState } from 'react';
import { SpicyToken } from 'types/SpicyToken';
import { SwapPair, SwapDirection } from 'types/Swap';
import ReactPlaceholder from 'react-placeholder/lib';
import 'react-placeholder/lib/reactPlaceholder.css';
import { useTheme } from 'styled-components';
import { Theme } from 'styles/theme/themes';

type PriceChartProps = {
  tokens?: SpicyToken[];
  pair?: SwapPair;
  setPair: (token: SpicyToken) => void;
  modalView: boolean;
  toggleModal: (dir?: SwapDirection) => void;
};

export default function PriceChart({
  tokens,
  pair,
  setPair,
  modalView,
  toggleModal,
}: PriceChartProps) {
  const theme = useTheme();
  const timeSelectOptions = Object.values(TimeSelectOption);

  const [activeTab, setActiveTab] = useState(0);
  const isActiveTab = (tab: TimeSelectOption) =>
    timeSelectOptions.indexOf(tab) === activeTab ? 'active' : '';

  const handleTabChange = (tab: TimeSelectOption) =>
    setActiveTab(timeSelectOptions.indexOf(tab));

  const hourlyOptions = Object.values(TimeSelectOption).map(selectOption => (
    <>
      <SubHeaderText
        className={isActiveTab(selectOption)}
        onClick={() => handleTabChange(selectOption)}
        hover={true}
      >
        {selectOption}
      </SubHeaderText>
    </>
  ));

  return (
    <PriceChartContainer>
      <PriceChartHeader>
        <PriceChartHeaderDescription>
          <ReactPlaceholder
            ready={Boolean(pair)}
            customPlaceholder={<PriceChartPlaceholder />}
          >
            <HeaderText>
              {`${pair?.from?.symbol}/${pair?.to?.symbol}`}
            </HeaderText>
            <HeaderPriceContainer>
              <SubHeaderText>0.021 {pair?.from?.symbol}</SubHeaderText>
              <SubHeaderTextColor up={true}>+0.00%</SubHeaderTextColor>
            </HeaderPriceContainer>
          </ReactPlaceholder>
        </PriceChartHeaderDescription>
        <PriceChartHeaderOptions>
          <PriceChartTimeSelection>{hourlyOptions}</PriceChartTimeSelection>
          <ButtonGroup>
            <Button className="active">Price</Button>
            <Button>Depth</Button>
          </ButtonGroup>
        </PriceChartHeaderOptions>
      </PriceChartHeader>
      <PriceChartBox>
        <ReactPlaceholder
          ready={Boolean(pair)}
          customPlaceholder={<PriceChartPlaceholder />}
        >
          {renderLineChart(theme)}
        </ReactPlaceholder>
      </PriceChartBox>
      <PriceChartFooter>
        <SubHeaderText style={{ fontSize: '0.85rem' }}>
          With limit orders, you may create and post swaps that will only
          execute when a certain price threshold is crossed.
        </SubHeaderText>
        <QuestionMarkIcon />
      </PriceChartFooter>
    </PriceChartContainer>
  );
}

const data = [
  {
    name: '02/07',
    uv: 6.9,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '02/28',
    uv: 6.5,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '03/01',
    uv: 6.0,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '03/02',
    uv: 1.7,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '03/03',
    uv: 1.6,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '03/04',
    uv: 1.5,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '03/05',
    uv: 1.0,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '03/06',
    uv: 4.0,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '03/07',
    uv: 3.0,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '03/08',
    uv: 2.0,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '03/09',
    uv: 2.78,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '03/10',
    uv: 1.89,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '03/11',
    uv: 2.39,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '03/12',
    uv: 3.49,
    pv: 4300,
    amt: 2100,
  },
];

const renderLineChart = (theme: Theme) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 20,
        left: 10,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" dy={10} stroke={theme.textSecondary} />
      <YAxis
        dx={-5}
        tickFormatter={value => `$${value.toFixed(2)}`}
        allowDecimals={true}
        stroke={theme.textSecondary}
      />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stroke={theme.backgroundVariant.replace(
          /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
          'rgba$1,1.5)',
        )}
        strokeWidth={3}
        fill={theme.backgroundVariant}
      />
    </AreaChart>
  </ResponsiveContainer>
);
