import { DAppClientOptions, NetworkType } from '@airgap/beacon-sdk';
import { SpicyToken } from 'types/SpicyToken';

/* todo: refactor into one global config object for easy access and import */

export const SPICY_API_URL: string = 'https://spicyb.sdaotools.xyz/';
export const TZKT_API_URL: string = 'https://api.tzkt.io/v1/';

export const DAPP_NAME: string = 'SourSwap';
export const DAPP_ICON_URL: string =
  'https://spicyswap.xyz/assets/spicy-pro.png';

export const DEFAULT_RPC: string = 'https://rpc.ghostnet.teztnets.xyz/';
export const DEFAULT_NETWORK_TYPE: NetworkType = NetworkType.GHOSTNET;

export const dappOptions: DAppClientOptions = {
  iconUrl: DAPP_ICON_URL,
  preferredNetwork: DEFAULT_NETWORK_TYPE,
  name: DAPP_NAME,
};

export const defaultPairList: string[] = [
  'KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn:0',
];

export const defaultFrom: SpicyToken = {
  decimals: 6,
  derivedUsd: 1.244648989805831,
  derivedXtz: 1,
  img: 'ipfs://bafybeidwsid6fvv4vxbqja7er3b4exsht5r7umv6hpz7rc3ujg7xilhwv4',
  name: 'WTZ',
  symbol: 'WTZ',
  tag: 'KT1PnUZCp3u2KzWr93pn4DD7HAJnm3rWVrgn:0',
  totalLiquidityUsd: 92874.1649167061,
  totalLiquidityXtz: 74618.76053199123,
};
