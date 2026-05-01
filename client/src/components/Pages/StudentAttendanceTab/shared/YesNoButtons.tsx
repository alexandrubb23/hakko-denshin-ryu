import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  attended: boolean | null; // null = not yet marked
  onYes: () => void;
  onNo: () => void;
  disabled?: boolean;
  size?: "small" | "medium";
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
}: Props) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <YesButton
        variant="outlined"
        size={size}
        disabled={disabled}
        onClick={onYes}
        active={attended === true}
        locked={attended === true}
      >
        Yes
      </YesButton>
      <NoButton
        variant="outlined"
        size={size}
        disabled={disabled}
        onClick={onNo}
        active={attended === false}
        locked={attended === false}
      >
        No
      </NoButton>
    </Box>
  );
};

export default YesNoButtons;
