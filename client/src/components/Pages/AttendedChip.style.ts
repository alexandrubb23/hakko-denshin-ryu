import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

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
    backgroundColor: "rgba(76,175,80,0.15)",
    color: "#4caf50",
  }),
  ...(attendedStatus === AttendedStatus.no && {
    backgroundColor: "rgba(239,83,80,0.12)",
    color: "#ef5350",
  }),
  ...(attendedStatus === AttendedStatus.unmarked && {
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "rgba(171,150,255,0.5)",
  }),
}));
