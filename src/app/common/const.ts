import { DAppClientOptions, NetworkType } from '@airgap/beacon-sdk';

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
