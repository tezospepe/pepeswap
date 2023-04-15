import { DAppClientOptions, NetworkType } from '@airgap/beacon-sdk';

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
  'KT1K4jn23GonEmZot3pMGth7unnzZ6EaMVjY:0',
];
