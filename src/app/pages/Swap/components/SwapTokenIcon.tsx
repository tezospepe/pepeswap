import * as React from 'react';
import styled from 'styled-components';

interface Props {
  url: void;
  className?: string;
}

const SwapSelectionTokenIcon = styled.img`
  width: 32px;
`;

const transformSpicyIpfsImg = url =>
  url.replace('ipfs://', 'https://ipfs.io/ipfs/');

export function SwapTokenIcon<Props>(props) {
  const { url, className } = props;
  let img;

  if (url.includes('ipfs://')) img = transformSpicyIpfsImg(url);

  return (
    <SwapSelectionTokenIcon
      className={className}
      src={img || url}
      alt=""
      key={url}
    />
  );
}
