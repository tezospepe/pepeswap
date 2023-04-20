import { UilArrowLeft, UilCog } from '@iconscout/react-unicons';
import { SpicyToken } from 'types/SpicyToken';
import { SwapTokenIcon } from '../SwapTokenIcon';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { stopPropagation } from 'utils/helper';
import {
  SwapTokenListBox,
  SwapTokenListAssetBalance,
  SwapTokenListAssetText,
  SwapTokenListContent,
  SwapTokenListHeader,
  SwapTokenListHeaderIcon,
  SwapTokenListItem,
  SwapTokenListSearch,
  SwapTokenListSearchIcon,
  SwapTokenListSearchInput,
} from './SwapTokenList';
import { P, P2 } from 'app/components/P';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../slice/selectors';
import pepedance from '../../../../assets/pepedance.gif';

interface SwapTokenListProps {
  toggleModal: void;
  tokens: SpicyToken[];
  setPair: void;
}

export function SwapTokenList<SwapTokenListProps>({
  toggleModal,
  tokens,
  setPair,
}) {
  const [tokenSearchInput, setTokenSearchInput] = useState<string>('');
  const refTokenSearchInput = useRef<HTMLInputElement>(null);

  const loading = useSelector(selectLoading);

  const handleTokenClick = (token: SpicyToken) => {
    setPair(token);
    toggleModal();
  };

  const handleSwapSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') refTokenSearchInput?.current?.blur();
  };

  const handleSwapSearchInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = event.target.value;
    setTokenSearchInput(inputValue.toLowerCase());
  };

  const trimTokenListByInput = (token: SpicyToken) => {
    return (
      token.name.toLowerCase().includes(tokenSearchInput) ||
      token.symbol.toLowerCase().includes(tokenSearchInput)
    );
  };

  return (
    <SwapTokenListBox onClick={stopPropagation}>
      <SwapTokenListHeader>
        <SwapTokenListHeaderIcon onClick={toggleModal}>
          <UilArrowLeft size="34" />
        </SwapTokenListHeaderIcon>
        <P style={{ fontSize: '18px' }}>Token Selection</P>
        <SwapTokenListHeaderIcon>
          <UilCog size="24" style={{ margin: '0 5px' }} />
        </SwapTokenListHeaderIcon>
      </SwapTokenListHeader>
      <SwapTokenListSearch>
        <SwapTokenListSearchIcon size="22" />
        <SwapTokenListSearchInput
          placeholder="Search token by name"
          onChange={handleSwapSearchInputChange}
          onKeyDown={handleSwapSearchEnter}
          ref={refTokenSearchInput}
        />
      </SwapTokenListSearch>
      <SwapTokenListContent>
        {loading ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              paddingTop: '20px',
              justifyContent: 'center',
            }}
          >
            <img src={pepedance} width={80} height={48}></img>
          </div>
        ) : (
          tokens.filter(trimTokenListByInput).map((token, index) => (
            <SwapTokenListItem
              onClick={() => handleTokenClick(token)}
              key={index}
            >
              <SwapTokenIcon url={token.img} />
              <SwapTokenListAssetText>
                <P>{token.name}</P>
                <P2>{token.symbol}</P2>
              </SwapTokenListAssetText>
              <SwapTokenListAssetBalance>
                <P>$ {token.derivedUsd.toFixed(2)}</P>
              </SwapTokenListAssetBalance>
            </SwapTokenListItem>
          ))
        )}
      </SwapTokenListContent>
    </SwapTokenListBox>
  );
}
