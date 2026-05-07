import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { SxProps, Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { BACKDROP_BLUR, BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

export const SectionLabel = styled(Typography)({
  marginBottom: 16,
  textTransform: "uppercase",
  letterSpacing: 1,
});

export const LinksGrid = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
});

export const LinkCard = styled(Card)({
  flex: "1 1 140px",
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  backdropFilter: BACKDROP_BLUR,
  backgroundImage: "none",
  transition: "border-color 200ms",
  "&:hover": { borderColor: PURPLE },
});

export const CARD_ACTION_SX: SxProps<Theme> = { p: 2.5 };

export const StyledCardContent = styled(CardContent)({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  "&:last-child": { paddingBottom: 0 },
});

export const ICON_SX: SxProps<Theme> = { fontSize: 36, color: PURPLE };
