import {
  CollectionsContainer,
  CollectionsContent,
  CollectionsHeader,
  CollectionsHeaderOptions,
  CollectionsHeaderTitle,
} from './style';

export default function Collections() {
  return (
    <CollectionsContainer>
      <CollectionsHeader></CollectionsHeader>
      <CollectionsHeaderTitle></CollectionsHeaderTitle>
      <CollectionsHeaderOptions></CollectionsHeaderOptions>
      <CollectionsContent></CollectionsContent>
    </CollectionsContainer>
  );
}
