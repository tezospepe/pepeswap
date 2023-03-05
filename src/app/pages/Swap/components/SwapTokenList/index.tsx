import { UilArrowLeft, UilCog } from '@iconscout/react-unicons';
import { SpicyToken } from 'types/SpicyToken';
import { SwapTokenIcon } from '../SwapTokenIcon';
import { ChangeEvent, useState } from 'react';
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

  const handleTokenClick = (token: SpicyToken) => {
    setPair(token);
    toggleModal();
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
        />
      </SwapTokenListSearch>
      <SwapTokenListContent>
        {tokens.filter(trimTokenListByInput).map(token => (
          <SwapTokenListItem onClick={() => handleTokenClick(token)}>
            <SwapTokenIcon url={token.img} />
            <SwapTokenListAssetText>
              <P>{token.name}</P>
              <P2>{token.symbol}</P2>
            </SwapTokenListAssetText>
            <SwapTokenListAssetBalance>
              <P>$ {token.derivedUsd.toFixed(2)}</P>
            </SwapTokenListAssetBalance>
          </SwapTokenListItem>
        ))}
      </SwapTokenListContent>
    </SwapTokenListBox>
  );
}
