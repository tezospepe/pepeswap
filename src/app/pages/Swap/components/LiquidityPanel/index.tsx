import { SwapDirection, SwapPair } from 'types/Swap';
import { SwapAssetSelection } from '../SwapSelection';
import {
  AmountSelectionButton,
  AmountSelectionButtons,
  LiquidityAmountSelection,
  MainText,
  Subtext,
  TitleText,
} from './styles';

type LiquidityPanelProps = {
  toggleModal: (dir?: SwapDirection) => void;
  pair?: SwapPair;
};

export default function LiquidityPanel({
  toggleModal,
  pair,
}: LiquidityPanelProps) {
  return (
    <>
      <SwapAssetSelection
        toggleModal={toggleModal}
        pair={pair}
        showSwitch={true}
      />
      <LiquidityAmountSelection>
        <Subtext>
          {pair?.from?.symbol}/{pair?.to?.symbol} minted
        </Subtext>
        <MainText>0.0000000000000</MainText>
        <TitleText>Share (12.22%)</TitleText>
        <AmountSelectionButtons>
          <AmountSelectionButton>max</AmountSelectionButton>
        </AmountSelectionButtons>
      </LiquidityAmountSelection>
    </>
  );
}
