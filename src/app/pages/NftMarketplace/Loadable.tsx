/**
 * Asynchronously loads the component for /nft
 */

import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NftMarketplace = lazyLoad(
  () => import('./index'),
  module => module.NftMarketplace,
  {
    fallback: (
      <LoadingWrapper>
        <LoadingIndicator />
      </LoadingWrapper>
    ),
  },
);
