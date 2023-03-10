import { useState, ReactElement } from 'react';
import LimitOrderPanel from '../LimitOrderPanel';
import { P3, Swap, Tabs } from '../SwapWidget/SwapWidget';
import { SwapAssetSelection } from '../SwapSelection';
import { SwapDirection, SwapPair } from 'types/Swap';

type SwapWidgetTabsProps = {
  children: ReactElement[];
};

type SwapWidgetTab = {
  label: string;
};

const swapWidgetTabs: SwapWidgetTab[] = [
  {
    label: 'Swap',
  },
  {
    label: 'Limit',
  },
  {
    label: 'Liquidity',
  },
];

export default function SwapWidgetTabs({ children }: SwapWidgetTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const isActiveTab = (tab: SwapWidgetTab) =>
    swapWidgetTabs.indexOf(tab) === activeTab ? 'active' : '';

  const handleTabChange = (tab: SwapWidgetTab) =>
    setActiveTab(swapWidgetTabs.indexOf(tab));

  return (
    <>
      <Tabs>
        {swapWidgetTabs.map(tab => (
          <P3
            className={isActiveTab(tab)}
            onClick={() => handleTabChange(tab)}
            style={{ fontSize: '16px' }}
            key={tab.label}
          >
            {tab.label}
          </P3>
        ))}
      </Tabs>
      <Swap>{children[activeTab]}</Swap>
    </>
  );
}
