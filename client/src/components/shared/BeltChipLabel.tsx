import { BELT_IMAGES } from "@assets/beltImages";

import { BeltImage, LabelRow } from "./BeltChipLabel.style";

interface Props {
  belt: string;
  name: string;
}

const BeltChipLabel = ({ belt, name }: Props) => (
  <LabelRow>
    <BeltImage
      src={BELT_IMAGES[belt] ?? BELT_IMAGES.white}
      alt={`${belt} belt`}
    />
    {name}
  </LabelRow>
);

export default BeltChipLabel;
