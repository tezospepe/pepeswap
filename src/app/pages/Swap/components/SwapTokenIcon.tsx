import * as React from 'react';
import styled from 'styled-components';

interface Props {
  url: void;
}

const SwapSelectionTokenIcon = styled.img`
  width: 32px;
`;

const transformSpicyIpfsImg = url =>
  url.replace('ipfs://', 'https://ipfs.io/ipfs/');

export function SwapTokenIcon<Props>({ url }) {
  let img;

  if (url.includes('ipfs://')) img = transformSpicyIpfsImg(url);

  return <SwapSelectionTokenIcon src={img || url} alt="" key={url} />;
}
