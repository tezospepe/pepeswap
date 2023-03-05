import { SwapDirection, SwapPair } from 'types/Swap';
import {
  SwapSelection,
  SwapSelectionAmountInput,
  SwapSelectionArrowIcon,
  SwapSelectionAsset,
  SwapSelectionScrollIcon,
  SwapSelectionTokenIcon,
} from './SwapSelection';
import { A } from 'app/components/A';

interface Props {
  toggleModal: void;
  pair: SwapPair;
}

export function SwapAssetSelection<Props>({ toggleModal, pair }) {
  const handleTokenClick = (dir: SwapDirection) => {
    toggleModal(dir);
  };

  return (
    <>
      <SwapSelection>
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
        <SwapSelectionAmountInput />
      </SwapSelection>
      <SwapSelectionScrollIcon />
      <SwapSelection>
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
        <SwapSelectionAmountInput />
      </SwapSelection>
    </>
  );
}
