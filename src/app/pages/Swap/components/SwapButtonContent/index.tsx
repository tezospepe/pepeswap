import { selectAccount, selectConnected } from 'app/slice/wallet/selectors';
import { useSelector } from 'react-redux';
import { selectIsSwapping } from '../../slice/selectors';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { Fragment } from 'react';

export const SwapButtonContent = (): JSX.Element => {
  const isSwapping = useSelector(selectIsSwapping);

  if (!isSwapping) {
    return <Fragment>{'Swap'}</Fragment>;
  }

  return <LoadingIndicator small={true} stroke={'rgba(15,15,15,1)'} />;
};
