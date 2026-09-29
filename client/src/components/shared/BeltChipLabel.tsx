import { useIntl } from "react-intl";

import { BELT_IMAGES } from "@assets/beltImages";

import { BeltImage, LabelRow } from "./BeltChipLabel.style";

interface Props {
  belt: string;
  name: string;
}

const BeltChipLabel = ({ belt, name }: Props) => {
  const intl = useIntl();

  return (
    <LabelRow>
      <BeltImage
        src={BELT_IMAGES[belt] ?? BELT_IMAGES.white}
        alt={intl.formatMessage({ id: "shared.belt.alt" }, { belt })}
      />
      {name}
    </LabelRow>
  );
};

export default BeltChipLabel;
