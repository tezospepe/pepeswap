import styled from 'styled-components';
import { UilSearch, UilArrowLeft, UilCog } from '@iconscout/react-unicons';
import { A } from 'app/components/A';
import { Lead } from 'app/components/Lead';
import { SwapInput } from './SwapSelector';
import tezosIcon from '../../../assets/tezos-icon.png';
import mttrIcon from '../../../assets/mttr-icon.png';
import sdaoIcon from '../../../assets/sdao-icon.png';
import tetherIcon from '../../../assets/tether-icon.png';
import uusdIcon from '../../../assets/uusd-icon.png';
import wtzIcon from '../../../assets/wtz-icon.png';

interface Props {
  show: boolean;
}

interface SwapSelectorProps {
  modalView: boolean;
  toggleModal: void;
}

const P = styled.p`
  margin: 0;
  color: ${p => p.theme.textSecondary};
  user-select: none;
  text-decoration: none;
  display: flex;
  font-size: 0.875rem;
  font-weight: 500;

  &.active {
    opacity: 1;
  }
`;

const P2 = styled(P)`
  color: ${p => p.theme.text};
  opacity: 0.7;
`;

export function SwapSelectorModal<SwapSelectorProps>({
  modalView,
  toggleModal,
}) {
  const handleTokenClick = () => {
    toggleModal();
  };

  return (
    <SwapSelectionModal show={modalView}>
      <SwapSelection>
        <SwapSelectionHeader>
          <SwapSelectionHeaderIcon onClick={toggleModal}>
            <UilArrowLeft size="34" />
          </SwapSelectionHeaderIcon>
          <P style={{ fontSize: '18px' }}>Token Selection</P>
          <SwapSelectionHeaderIcon>
            <UilCog size="24" style={{ margin: '0 5px' }} />
          </SwapSelectionHeaderIcon>
        </SwapSelectionHeader>
        <SwapSelectionSearch>
          <SwapSelectionSearchIcon size="22" />
          <SwapAssetInput placeholder="Search token by name" />
        </SwapSelectionSearch>
        <SwapSelectionTokenList>
          <SwapSelectionTokenItem>
            <SwapSelectionTokenIcon src={tezosIcon} />
            <SwapSelectionTokenAssetText>
              <P>Tezos</P>
              <P2>XTZ</P2>
            </SwapSelectionTokenAssetText>
            <SwapSelectionTokenAssetBalance>
              <P>0.01</P>
            </SwapSelectionTokenAssetBalance>
          </SwapSelectionTokenItem>
          <SwapSelectionTokenItem>
            <SwapSelectionTokenIcon src={wtzIcon} />
            <SwapSelectionTokenAssetText>
              <P>Wrapped Tezos</P>
              <P2>WTZ</P2>
            </SwapSelectionTokenAssetText>
            <SwapSelectionTokenAssetBalance>
              <P>0.00</P>
            </SwapSelectionTokenAssetBalance>
          </SwapSelectionTokenItem>
          <SwapSelectionTokenItem>
            <SwapSelectionTokenIcon src={sdaoIcon} />
            <SwapSelectionTokenAssetText>
              <P>Salsa DAO</P>
              <P2>sDAO</P2>
            </SwapSelectionTokenAssetText>
            <SwapSelectionTokenAssetBalance>
              <P>0.00</P>
            </SwapSelectionTokenAssetBalance>
          </SwapSelectionTokenItem>
          <SwapSelectionTokenItem>
            <SwapSelectionTokenIcon src={tetherIcon} />
            <SwapSelectionTokenAssetText>
              <P>Tether USD</P>
              <P2>USDT</P2>
            </SwapSelectionTokenAssetText>
            <SwapSelectionTokenAssetBalance>
              <P>0.00</P>
            </SwapSelectionTokenAssetBalance>
          </SwapSelectionTokenItem>
          <SwapSelectionTokenItem>
            <SwapSelectionTokenIcon src={uusdIcon} />
            <SwapSelectionTokenAssetText>
              <P>Youves USD</P>
              <P2>uUSD</P2>
            </SwapSelectionTokenAssetText>
            <SwapSelectionTokenAssetBalance>
              <P>0.00</P>
            </SwapSelectionTokenAssetBalance>
          </SwapSelectionTokenItem>
        </SwapSelectionTokenList>
      </SwapSelection>
    </SwapSelectionModal>
  );
}

export const SwapSelectionModal = styled.div<Props>`
  z-index: 1000;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const SwapSelection = styled.div`
  display: grid;
  background-color: ${p => p.theme.background};
  max-width: 600px;
  max-height: 600px;
  border-radius: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 0.2fr 1fr;
  grid-row-gap: 12px;
`;

export const SwapSelectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  padding: 12px;
`;

export const SwapSelectionHeaderIcon = styled(A)``;

export const SwapSelectionSearchIcon = styled(UilSearch)`
  position: absolute;
  z-index: 10;
  color: white;
  margin-left: 10px;
`;

const SwapAssetInput = styled(SwapInput)`
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  text-align: left;
  padding-left: 42px;
`;

const SwapSelectionSearch = styled.div`
  display: flex;
  padding: 0 16px;
  align-items: center;
`;

const SwapSelectionTokenList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 16px;
`;

const SwapSelectionTokenItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  max-width: 400px;
  height: 60px;
  background-color: ${p => p.theme.borderLight};
  border-radius: 10px;
  padding: 0 12px;
  gap: 12px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;

const SwapSelectionTokenAssetText = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
`;

const SwapSelectionTokenAssetBalance = styled.div`
  margin-left: auto;
  align-self: center;
`;

const SwapSelectionTokenIcon = styled.img`
  width: 32px;
`;
