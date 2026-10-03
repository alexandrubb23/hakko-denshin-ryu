import type { EventType } from "@hakko/core";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { type SxProps, type Theme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { outlinedButtonSx } from "@components/ui/PageSections/PageSections.style";
import {
  EVENT_CAMP_BG,
  EVENT_DEMO_BG,
  EVENT_OTHER_BG,
  EVENT_SEMINAR_BG,
} from "@style/events.tokens";

import {
  BORDER_COLOR,
  BORDER_HOVER,
  PURPLE,
  PURPLE_ALPHA_06,
  SURFACE_BG,
  TEXT_MUTED,
  TEXT_PRIMARY,
  TEXT_SUBTLE,
} from "@style/colorScheme";

// ─── Cover photo ──────────────────────────────────────────────────────────────

// Larger than the default, and further left, away from the menu
export const coverPhotoSx: SxProps<Theme> = {
  height: "140%",
  mt: "-40px",
  mr: "80px",
};

export const TYPE_COLORS: Record<EventType, string> = {
  seminar: EVENT_SEMINAR_BG,
  demo: EVENT_DEMO_BG,
  camp: EVENT_CAMP_BG,
  other: EVENT_OTHER_BG,
};

// Keeps the section from collapsing while loading, empty or short-listed
export const EVENTS_LIST_SX = { minHeight: "40vh" } as const;

// Card size in the grid; shared by the cards and their skeletons
export const EVENT_CARD_SIZE = { xs: 12, sm: 6, md: 4 } as const;

export const EVENT_IMAGE_HEIGHT = 180;

const cardBase = {
  boxShadow: "none",
  backgroundColor: SURFACE_BG,
  // Not the theme's text colours: those stay white in the light scheme
  color: TEXT_PRIMARY,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 8,
  height: "100%",
} as const;

export const SkeletonCard = styled(Card)(cardBase);

export const EventCard = styled(Card)({
  ...cardBase,
  display: "flex",
  flexDirection: "column",
  transition: "border-color 0.2s, transform 0.2s",
  "&:hover": {
    borderColor: BORDER_HOVER,
    transform: "translateY(-2px)",
  },
});

export const ImagePlaceholder = styled(Box)({
  height: EVENT_IMAGE_HEIGHT,
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
  color: TEXT_MUTED,
});

export const MUTED_TEXT_SX = { color: TEXT_MUTED } as const;

export const EMPTY_ICON_SX = { fontSize: 56, color: TEXT_SUBTLE } as const;

export const TICKET_BUTTON_SX = {
  ...outlinedButtonSx,
  mt: "auto",
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
  alignSelf: "flex-start" as const,
  backgroundColor: bgColor,
  color: PURPLE,
  fontWeight: 600,
  textTransform: "capitalize" as const,
});
