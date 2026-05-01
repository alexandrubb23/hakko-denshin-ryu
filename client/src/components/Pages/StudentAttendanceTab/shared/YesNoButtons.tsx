import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  borderColor: active ? "#4caf50" : "rgba(76,175,80,0.3)",
  color: active ? "#4caf50" : "rgba(76,175,80,0.5)",
  ...(locked && { pointerEvents: "none", cursor: "default" }),
  ...(!locked &&
    active && {
      "&:hover": {
        borderColor: "#66bb6a",
        backgroundColor: "rgba(76,175,80,0.08)",
      },
    }),
}));

const NoButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active" && prop !== "locked",
})<{ active: boolean; locked: boolean }>(({ active, locked }) => ({
  minWidth: 0,
  borderColor: active ? "#f44336" : "rgba(244,67,54,0.3)",
  color: active ? "#f44336" : "rgba(244,67,54,0.5)",
  ...(locked && { pointerEvents: "none", cursor: "default" }),
  ...(!locked &&
    active && {
      "&:hover": {
        borderColor: "#ef5350",
        backgroundColor: "rgba(244,67,54,0.08)",
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
  const btnSx = compact
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
        aria-label="Yes"
        sx={btnSx}
      >
        {compact ? "Y" : "Yes"}
      </YesButton>
      <NoButton
        variant="outlined"
        size={size}
        disabled={disabled}
        onClick={onNo}
        active={attended === false}
        locked={attended === false}
        aria-label="No"
        sx={btnSx}
      >
        {compact ? "N" : "No"}
      </NoButton>
    </Box>
  );
};

export default YesNoButtons;
