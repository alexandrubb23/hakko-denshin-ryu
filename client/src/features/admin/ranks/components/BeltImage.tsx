import { Box, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";

import { BELT_IMAGES } from "@assets/beltImages";
import type { IntlMessageID } from "i18n/messages";

const BELT_COLOR_IDS: Record<string, IntlMessageID> = {
  white: "admin.ranks.belt.white",
  yellow: "admin.ranks.belt.yellow",
  orange: "admin.ranks.belt.orange",
  green: "admin.ranks.belt.green",
  blue: "admin.ranks.belt.blue",
  brown: "admin.ranks.belt.brown",
  black: "admin.ranks.belt.black",
};

interface Props {
  belt: string;
}

const BeltImage = ({ belt }: Props) => {
  const intl = useIntl();
  const colorId = BELT_COLOR_IDS[belt];
  const color = colorId ? intl.formatMessage({ id: colorId }) : belt;

  return (
    <Tooltip title={color} placement="right">
      <Box
        component="img"
        src={BELT_IMAGES[belt] ?? BELT_IMAGES.white}
        alt={intl.formatMessage({ id: "admin.ranks.belt.alt" }, { color })}
        sx={{
          height: 24,
          width: "auto",
          minWidth: 96,
          display: "block",
          objectFit: "contain",
        }}
      />
    </Tooltip>
  );
};

export default BeltImage;
