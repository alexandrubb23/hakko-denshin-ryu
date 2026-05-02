import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import {
  EVENT_CAMP_BG,
  EVENT_DEMO_BG,
  EVENT_OTHER_BG,
  EVENT_SEMINAR_BG,
} from "@style/events.tokens";
import {
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG_GRADIENT,
  PURPLE,
  PURPLE_ALPHA_06,
  PURPLE_ALPHA_08,
  PURPLE_ALPHA_30,
  SURFACE_BG,
} from "@style/tokens";

export const TYPE_COLORS: Record<string, string> = {
  seminar: EVENT_SEMINAR_BG,
  demo: EVENT_DEMO_BG,
  camp: EVENT_CAMP_BG,
  other: EVENT_OTHER_BG,
};

export const PageWrapper = styled(Box)({
  minHeight: "60vh",
  padding: "64px 0",
  background: DARK_BG_GRADIENT,
});

export const EventCard = styled(Card)({
  boxShadow: "none",
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 8,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "border-color 0.2s, transform 0.2s",
  "&:hover": {
    borderColor: BORDER_HOVER,
    transform: "translateY(-2px)",
  },
});

export const SkeletonCard = styled(Card)({
  boxShadow: "none",
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 8,
  height: "100%",
});

export const ImagePlaceholder = styled(Box)({
  height: 180,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: PURPLE_ALPHA_06,
});

export const DetailsTypography = styled(Typography)({
  flex: 1,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const TICKET_BUTTON_SX = {
  mt: "auto",
  borderColor: PURPLE_ALPHA_30,
  color: PURPLE,
  "&:hover": {
    borderColor: PURPLE,
    backgroundColor: PURPLE_ALPHA_08,
  },
} as const;

export const CARD_CONTENT_SX = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
} as const;

export const ICON_SX = {
  fontSize: 16,
  color: PURPLE,
  mt: "2px",
  flexShrink: 0,
} as const;

export const chipSx = (bgColor: string) => ({
  backgroundColor: bgColor,
  color: PURPLE,
  fontWeight: 600,
  textTransform: "capitalize" as const,
});
