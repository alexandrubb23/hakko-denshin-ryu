import { useIntl } from "react-intl";

import { Box, SxProps, Theme } from "@mui/material";

import litImage from "@assets/images/training-lantern-small.webp";
import unlitImage from "@assets/images/training-lantern-unlit-small.webp";

import { lanternLightSx, lanternSx } from "./TrainingLantern.style";

interface Props {
  /** The lantern's height, cord included */
  height: string;
  /** Lit on the day of the training */
  lit: boolean;
  /** Where it hangs (left is its centre) */
  sx?: SxProps<Theme>;
}

/** A paper lantern hung over a training day's board, lit on the day itself */
const TrainingLantern = ({ height, lit, sx }: Props) => {
  const intl = useIntl();

  return (
    <Box sx={lanternSx(height, sx)}>
      <img src={unlitImage} alt="" />
      {/* Over the unlit paper, so the candle fades in once today is known */}
      <Box sx={lanternLightSx(lit)}>
        <img
          src={litImage}
          alt={lit ? intl.formatMessage({ id: "page.schedule.day.today" }) : ""}
        />
      </Box>
    </Box>
  );
};

export default TrainingLantern;
