import { Box } from 'app/components/base/Box';
import styled from 'styled-components';

export const CollectionsContainer = styled(Box)`
  width: 1400px;
  height: 700px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 10fr;
`;

export const CollectionsHeader = styled.div`
  grid-area: 1 / 1 / 2 / 4;
`;

export const CollectionsHeaderTitle = styled.div`
  grid-area: 1 / 1 / 2 / 2;
`;

export const CollectionsHeaderOptions = styled.div`
  grid-area: 1 / 3 / 2 / 4;
`;

export const CollectionsContent = styled.div`
  grid-area: 2 / 1 / 3 / 4;
`;
