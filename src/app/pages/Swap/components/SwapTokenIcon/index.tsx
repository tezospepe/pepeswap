import { TokenIcon } from './SwapTokenIcon';

interface Props {
  url: void;
  className?: string;
}

const transformSpicyIpfsImg = url =>
  url.replace('ipfs://', 'https://ipfs.io/ipfs/');

export function SwapTokenIcon<Props>(props) {
  const { url, className } = props;
  let img;

  if (url.includes('ipfs://')) img = transformSpicyIpfsImg(url);

  return <TokenIcon className={className} src={img || url} alt="" key={url} />;
}
