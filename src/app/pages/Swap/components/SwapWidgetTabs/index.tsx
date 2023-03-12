import { useState, ReactElement } from 'react';
import LimitOrderPanel from '../LimitOrderPanel';
import { P3, Swap, Tabs } from '../SwapWidget/SwapWidget';
import { SwapAssetSelection } from '../SwapSelection';
import { SwapDirection, SwapPair } from 'types/Swap';

type SwapWidgetTabsProps = {
  children: ReactElement[];
  activeTab: string;
  handleTabChange: (tab: SwapWidgetTab | string) => void;
};

export enum SwapWidgetTab {
  Swap = 'Swap',
  Limit = 'Limit',
  Liquidity = 'Liquidity',
}

export const swapWidgetTabs = Object.keys(SwapWidgetTab);

export default function SwapWidgetTabs({
  children,
  activeTab,
  handleTabChange,
}: SwapWidgetTabsProps) {
  const isActiveTab = (tab: SwapWidgetTab | string) =>
    tab === activeTab ? 'active' : '';

  return (
    <>
      <Tabs>
        {swapWidgetTabs.map(tab => (
          <P3
            className={isActiveTab(tab)}
            onClick={() => handleTabChange(tab)}
            style={{ fontSize: '16px' }}
            key={tab}
          >
            {tab}
          </P3>
        ))}
      </Tabs>
      <Swap>{children[swapWidgetTabs.indexOf(activeTab)]}</Swap>
    </>
  );
}
