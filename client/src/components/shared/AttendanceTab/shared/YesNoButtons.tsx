import { Box, Button, SxProps, Theme } from "@mui/material";
import { useIntl } from "react-intl";

import { styled } from "@mui/material/styles";
import {
  ERROR,
  ERROR_ALPHA_08,
  ERROR_ALPHA_30,
  ERROR_ALPHA_50,
  ERROR_SOFT,
  SUCCESS,
  SUCCESS_ALPHA_08,
  SUCCESS_ALPHA_30,
  SUCCESS_ALPHA_50,
  SUCCESS_HOVER,
} from "@style/status.tokens";

interface Props {
  attended: boolean | null; // null = not yet marked
  onYes: () => void;
  onNo: () => void;
  disabled?: boolean;
  size?: "small" | "medium";
  compact?: boolean;
}

const YesButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "locked",
})<{ active: boolean; locked: boolean }>(({ active, locked }) => ({
  minWidth: 0,
  borderColor: active ? SUCCESS : SUCCESS_ALPHA_30,
  color: active ? SUCCESS : SUCCESS_ALPHA_50,
  ...(locked && { pointerEvents: "none", cursor: "default" }),
  ...(!locked &&
    active && {
      "&:hover": {
        borderColor: SUCCESS_HOVER,
        backgroundColor: SUCCESS_ALPHA_08,
      },
    }),
}));

const NoButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "locked",
})<{ active: boolean; locked: boolean }>(({ active, locked }) => ({
  minWidth: 0,
  borderColor: active ? ERROR : ERROR_ALPHA_30,
  color: active ? ERROR : ERROR_ALPHA_50,
  ...(locked && { pointerEvents: "none", cursor: "default" }),
  ...(!locked &&
    active && {
      "&:hover": {
        borderColor: ERROR_SOFT,
        backgroundColor: ERROR_ALPHA_08,
      },
    }),
}));

const YesNoButtons = ({
  attended,
  onYes,
  onNo,
  disabled = false,
  size = "small",
  compact = false,
}: Props) => {
  const intl = useIntl();
  const yesLabel = intl.formatMessage({ id: "common.yes" });
  const noLabel = intl.formatMessage({ id: "common.no" });
  const yesShort = intl.formatMessage({ id: "attendance.yes.short" });
  const noShort = intl.formatMessage({ id: "attendance.no.short" });
  const btnSx: SxProps<Theme> | undefined = compact
    ? { padding: "1px 5px", fontSize: "0.65rem", lineHeight: 1.4 }
    : undefined;

  return (
    <Box sx={{ display: "flex", gap: compact ? 0.5 : 1 }}>
      <YesButton
        variant="outlined"
        size={size}
        disabled={disabled}
        onClick={onYes}
        active={attended === true}
        locked={attended === true}
        aria-label={yesLabel}
        sx={btnSx}
      >
        {compact ? yesShort : yesLabel}
      </YesButton>
      <NoButton
        variant="outlined"
        size={size}
        disabled={disabled}
        onClick={onNo}
        active={attended === false}
        locked={attended === false}
        aria-label={noLabel}
        sx={btnSx}
      >
        {compact ? noShort : noLabel}
      </NoButton>
    </Box>
  );
};

export default YesNoButtons;
