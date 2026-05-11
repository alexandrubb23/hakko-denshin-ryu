import { STUDENT_CATEGORIES, type StudentCategory } from "@hakko/core";
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CATEGORY_KID_BG,
  CATEGORY_KID_COLOR,
  CATEGORY_SENIOR_BG,
  CATEGORY_SENIOR_COLOR,
} from "@style/categories.tokens";

const CATEGORY_COLORS: Record<StudentCategory, { color: string; bg: string }> =
  {
    [STUDENT_CATEGORIES[0]]: { color: CATEGORY_KID_COLOR, bg: CATEGORY_KID_BG },
    [STUDENT_CATEGORIES[1]]: {
      color: CATEGORY_SENIOR_COLOR,
      bg: CATEGORY_SENIOR_BG,
    },
  };

export const CategoryChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "category",
})<{ category: StudentCategory }>(({ category }) => ({
  fontSize: "0.75rem",
  minWidth: 64,
  borderColor: CATEGORY_COLORS[category].color,
  color: CATEGORY_COLORS[category].color,
  backgroundColor: CATEGORY_COLORS[category].bg,
}));
