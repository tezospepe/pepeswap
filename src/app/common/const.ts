import { DAppClientOptions, NetworkType } from '@airgap/beacon-sdk';
import { SpicyToken } from 'types/SpicyToken';

/* todo: refactor into one global config object for easy access and import */

export const SPICY_API_URL: string = 'https://spicyb.sdaotools.xyz/';
export const TZKT_API_URL: string = 'https://api.tzkt.io/v1/';

export const SPICY_ROUTER: string = 'KT1PwoZxyv4XkPEGnTqWYvjA1UYiPTgAGyqL';

export const DAPP_NAME: string = 'PepeSwap';
export const DAPP_ICON_URL: string =
  'https://bafybeigqka2ynrib6ytxku3nvakork5smsxni5xdqro56kd7ecsfos7z7a.ipfs.dweb.link/';

export const DEFAULT_RPC: string = 'https://mainnet.api.tez.ie';
export const DEFAULT_NETWORK_TYPE: NetworkType = NetworkType.MAINNET;

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

export const defaultTo: SpicyToken = {
  decimals: 2,
  derivedUsd: 0.000096774597620169,
  derivedXtz: 0.00008606377324968,
  img: 'ipfs://bafybeigqka2ynrib6ytxku3nvakork5smsxni5xdqro56kd7ecsfos7z7a',
  name: 'Tezos Pepe',
  symbol: 'PEPE',
  tag: 'KT1MZg99PxMDEENwB4Fi64xkqAVh5d1rv8Z9:0',
  totalLiquidityUsd: 2147.0167050012815,
  totalLiquidityXtz: 2414.217618689571,
};
