import { useSelector } from 'react-redux';
import { selectIsSwapping } from '../../slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { Fragment } from 'react';
import { SwapWidgetTab } from '../SwapWidgetTabs';

export const SwapButtonContent = ({
  activeTab,
}: {
  activeTab: string;
}): JSX.Element => {
  const isSwapping = useSelector(selectIsSwapping);

  if (activeTab === SwapWidgetTab.Liquidity) {
    return <Fragment>{'Add Liquidity'}</Fragment>;
  }

  if (!isSwapping) {
    return <Fragment>{'Swap'}</Fragment>;
  }

  return <LoadingIndicator small={true} stroke={'rgba(15,15,15,1)'} />;
};
