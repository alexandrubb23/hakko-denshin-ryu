import { Button, styled } from "@mui/material";

import {
  ERROR,
  ERROR_ALPHA_08,
  ERROR_ALPHA_30,
  SUCCESS,
  SUCCESS_ALPHA_08,
  SUCCESS_ALPHA_30,
} from "@style/status.tokens";

export const YesButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
  minWidth: 52,
  ...(active
    ? {
        backgroundColor: SUCCESS,
        color: "#fff",
        "&:hover": { backgroundColor: SUCCESS_ALPHA_30 },
      }
    : {
        borderColor: SUCCESS_ALPHA_30,
        color: SUCCESS,
        "&:hover": { borderColor: SUCCESS, backgroundColor: SUCCESS_ALPHA_08 },
      }),
}));

export const NoButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>(({ active }) => ({
  minWidth: 52,
  ...(active
    ? {
        backgroundColor: ERROR,
        color: "#fff",
        "&:hover": { backgroundColor: ERROR_ALPHA_30 },
      }
    : {
        borderColor: ERROR_ALPHA_30,
        color: ERROR,
        "&:hover": { borderColor: ERROR, backgroundColor: ERROR_ALPHA_08 },
      }),
}));
