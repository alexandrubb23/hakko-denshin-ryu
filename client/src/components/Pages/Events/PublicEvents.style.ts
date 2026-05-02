import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { BORDER_COLOR, BORDER_HOVER, PURPLE, SURFACE_BG } from "@style/tokens";

export const TYPE_COLORS: Record<string, string> = {
  seminar: "rgba(171,150,255,0.2)",
  demo: "rgba(33,150,243,0.2)",
  camp: "rgba(76,175,80,0.2)",
  other: "rgba(255,255,255,0.1)",
};

export const PageWrapper = styled(Box)({
  minHeight: "60vh",
  padding: "64px 0",
  background:
    "linear-gradient(180deg, rgba(10,6,25,0) 0%, rgba(10,6,25,0.8) 100%)",
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
  backgroundColor: "rgba(171,150,255,0.06)",
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
  borderColor: "rgba(171,150,255,0.3)",
  color: PURPLE,
  "&:hover": {
    borderColor: PURPLE,
    backgroundColor: "rgba(171,150,255,0.08)",
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
