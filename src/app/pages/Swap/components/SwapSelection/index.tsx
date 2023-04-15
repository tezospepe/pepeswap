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
import { ChangeEvent, useEffect } from 'react';
import { getSwapAmount } from '../../util/price';
interface SwapAssetSelectionProps {
  toggleModal: (dir?: SwapDirection) => void;
  pair?: SwapPair;
  showSwitch?: boolean;
}

export function SwapAssetSelection({
  toggleModal,
  pair,
  showSwitch = true,
}: SwapAssetSelectionProps) {
  const { actions } = useSpicySwapSlice();
  const dispatch = useDispatch();

  const fromAmount = useSelector(selectFromAmount);
  const toAmount = useSelector(selectToAmount);

  const handleTokenClick = (dir: SwapDirection) => {
    toggleModal(dir);
  };

  const formatAmount = (value: number | undefined) => (value ? value : '');

  const handleFromAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fromInputValue = Number(event.target.value);
    dispatch(actions.setFromAmount(fromInputValue));
  };

  const handleToAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const toInputValue = Number(event.target.value);
    dispatch(actions.setToAmount(toInputValue));
  };

  useEffect(() => {
    if (pair && pair.pool) {
      const { toAmount, priceImpact } = getSwapAmount({
        pair,
        fromAmount,
      });

      dispatch(actions.setToAmount(toAmount));
    }
  }, [pair, fromAmount]);

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
            {pair && pair.from ? (
              <>
                <SwapSelectionTokenIcon url={pair.from.img} />
                {pair.from.symbol}
                <SwapSelectionArrowIcon />
              </>
            ) : (
              <></>
            )}
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
            {pair && pair.to ? (
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
