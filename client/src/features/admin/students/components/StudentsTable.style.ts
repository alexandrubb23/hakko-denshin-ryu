import type { StudentCategory } from "@hakko/core";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CATEGORY_COLORS } from "@style/categories.tokens";

export const CategoryChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "category",
})<{ category: StudentCategory }>(({ category }) => ({
  fontSize: "0.75rem",
  minWidth: 64,
  borderColor: CATEGORY_COLORS[category].color,
  color: CATEGORY_COLORS[category].color,
  backgroundColor: CATEGORY_COLORS[category].bg,
}));
