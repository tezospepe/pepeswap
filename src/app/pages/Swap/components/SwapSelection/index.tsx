import { SwapDirection, SwapPair } from 'types/Swap';
import {
  MainText,
  Subtext,
  SwapSelection,
  SwapSelectionAmountInput,
  SwapSelectionArrowIcon,
  SwapSelectionAsset,
  SwapSelectionScrollIcon,
  SwapSelectionTokenIcon,
  TitleText,
} from './SwapSelection';
import { A } from 'app/components/A';
import { useSpicySwapSlice } from '../../slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectFromAmount, selectToAmount } from '../../slice/selectors';
import { ChangeEvent } from 'react';

interface Props {
  toggleModal: void;
  pair?: SwapPair;
  showSwitch?: boolean;
}

export function SwapAssetSelection<Props>({
  toggleModal,
  pair,
  showSwitch = true,
}) {
  const { actions } = useSpicySwapSlice();
  const dispatch = useDispatch();

  const fromAmount = useSelector(selectFromAmount);
  const toAmount = useSelector(selectToAmount);

  const formatAmount = (value: number | undefined) => (value ? value : '');

  const handleTokenClick = (dir: SwapDirection) => {
    toggleModal(dir);
  };
  const handleFromAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fromInputValue = Number(event.target.value);
    dispatch(actions.setFromAmount(fromInputValue));
  };

  const handleToAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const toInputValue = Number(event.target.value);
    dispatch(actions.setToAmount(toInputValue));
  };

  return (
    <>
      <SwapSelection>
        <Subtext>From</Subtext>
        <A
          onClick={() => {
            handleTokenClick('from');
          }}
        >
          <SwapSelectionAsset>
            {pair && pair.hasOwnProperty('from') ? (
              <>
                <SwapSelectionTokenIcon url={pair.from.img} />
                {pair.from.symbol}
              </>
            ) : (
              'Select Token'
            )}
            <SwapSelectionArrowIcon />
          </SwapSelectionAsset>
        </A>
        <TitleText>Balance: 1212.22</TitleText>
        <SwapSelectionAmountInput
          type="number"
          onChange={handleFromAmountChange}
          value={formatAmount(fromAmount)}
          placeholder="0.00000000"
        />
      </SwapSelection>
      {showSwitch ? <SwapSelectionScrollIcon /> : null}
      <SwapSelection>
        <Subtext>To</Subtext>
        <A
          onClick={() => {
            handleTokenClick('to');
          }}
        >
          <SwapSelectionAsset>
            {pair && pair.hasOwnProperty('to') ? (
              <>
                <SwapSelectionTokenIcon url={pair.to.img} />
                {pair.to.symbol}
              </>
            ) : (
              'Select Token'
            )}
            <SwapSelectionArrowIcon />
          </SwapSelectionAsset>
        </A>
        <TitleText>Balance: 0.00</TitleText>
        <SwapSelectionAmountInput
          type="number"
          onChange={handleToAmountChange}
          value={formatAmount(toAmount)}
          placeholder="0.00000000"
        />
      </SwapSelection>
    </>
  );
}
