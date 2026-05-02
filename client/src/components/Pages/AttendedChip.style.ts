import { Chip } from "@mui/material";

import { styled } from "@mui/material/styles";
import {
  ERROR_SOFT,
  ERROR_SOFT_ALPHA_12,
  SUCCESS,
  SUCCESS_ALPHA_15,
} from "@style/status.tokens";
import { PURPLE_ALPHA_50, WHITE_ALPHA_06 } from "@style/tokens";

export enum AttendedStatus {
  yes = "yes",
  no = "no",
  unmarked = "unmarked",
}

export const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "attendedStatus",
})<{ attendedStatus: AttendedStatus }>(({ attendedStatus }) => ({
  fontWeight: 600,
  ...(attendedStatus === AttendedStatus.yes && {
    backgroundColor: SUCCESS_ALPHA_15,
    color: SUCCESS,
  }),
  ...(attendedStatus === AttendedStatus.no && {
    backgroundColor: ERROR_SOFT_ALPHA_12,
    color: ERROR_SOFT,
  }),
  ...(attendedStatus === AttendedStatus.unmarked && {
    backgroundColor: WHITE_ALPHA_06,
    color: PURPLE_ALPHA_50,
  }),
}));
