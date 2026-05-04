import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Chip, Stack } from "@mui/material";
import { DARK_BG, PURPLE, PURPLE_ALPHA_15, PURPLE_HOVER } from "@style/tokens";

import PageTitle from "./PageTitle";

interface StudentsHeaderProps {
  count: number | undefined;
  onAdd: () => void;
}

const StudentsHeader = ({ count, onAdd }: StudentsHeaderProps) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    alignItems={{ xs: "flex-start", sm: "center" }}
    gap={1.5}
    mb={3}
  >
    <Stack direction="row" alignItems="center" gap={1.5}>
      <PeopleIcon sx={{ color: PURPLE, fontSize: 32 }} />
      <PageTitle>Students</PageTitle>
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
      startIcon={<PersonAddIcon />}
      onClick={onAdd}
      sx={{
        backgroundColor: PURPLE,
        color: DARK_BG,
        fontWeight: 700,
        "&:hover": { backgroundColor: PURPLE_HOVER },
      }}
    >
      Add Student
    </Button>
  </Stack>
);

export default StudentsHeader;
