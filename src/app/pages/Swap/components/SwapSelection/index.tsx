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
import { getSwapQuote } from '../../util/price';

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

  const formatAmount = (value: number | undefined) => (value ? value : '');

  const handleTokenClick = (dir: SwapDirection) => {
    toggleModal(dir);
  };

  const getSwapAmount = (pair, fromAmount) => {
    const tokenFrom =
      pair.pool.fromToken.tag === pair.from?.tag
        ? pair.pool.fromToken
        : pair.pool.toToken;

    const tokenTo =
      pair.pool.toToken.tag === pair.to?.tag
        ? pair.pool.toToken
        : pair.pool.fromToken;

    const tokenFromReserve = Number(tokenFrom.reserve);
    const tokenToReserve = Number(tokenTo.reserve);

    return getSwapQuote({
      tokenFromReserve,
      tokenToReserve,
      tokenFromAmount: fromAmount,
    });
  };

  const handleFromAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fromInputValue = Number(event.target.value);
    dispatch(actions.setFromAmount(fromInputValue));

    if (pair && pair.pool) {
      const toAmount = getSwapAmount(pair, fromInputValue);
      dispatch(actions.setToAmount(toAmount));
    }
  };

  const handleToAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const toInputValue = Number(event.target.value);
    dispatch(actions.setToAmount(toInputValue));
  };

  useEffect(() => {
    if (pair && pair.pool && fromAmount) {
      const toAmount = getSwapAmount(pair, fromAmount);
      dispatch(actions.setToAmount(toAmount));
    }
  }, [pair]);

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
