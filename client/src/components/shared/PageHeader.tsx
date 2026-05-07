import { Box, Button, Chip, Stack } from "@mui/material";
import { DARK_BG, PURPLE, PURPLE_ALPHA_15, PURPLE_HOVER } from "@style/tokens";
import { ReactNode } from "react";

import PageTitle from "./PageTitle";

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  count?: number;
  addIcon: ReactNode;
  addLabel: string;
  onAdd: () => void;
}

const PageHeader = ({
  icon,
  title,
  count,
  addIcon,
  addLabel,
  onAdd,
}: PageHeaderProps) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    alignItems={{ xs: "flex-start", sm: "center" }}
    gap={1.5}
    mb={3}
  >
    <Stack direction="row" alignItems="center" gap={1.5}>
      <Box sx={{ color: PURPLE, fontSize: 32, display: "flex" }}>{icon}</Box>
      <PageTitle>{title}</PageTitle>
      {count !== undefined && (
        <Chip
          label={count}
          size="small"
          sx={{
            backgroundColor: PURPLE_ALPHA_15,
            color: PURPLE,
            fontWeight: 700,
          }}
        />
      )}
    </Stack>
    <Box flexGrow={1} />
    <Button
      variant="contained"
      startIcon={addIcon}
      onClick={onAdd}
      sx={{
        backgroundColor: PURPLE,
        color: DARK_BG,
        fontWeight: 700,
        "&:hover": { backgroundColor: PURPLE_HOVER },
      }}
    >
      {addLabel}
    </Button>
  </Stack>
);

export default PageHeader;
