import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";

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
      <PeopleIcon sx={{ color: "#AB96FF", fontSize: 32 }} />
      <Typography variant="h4" fontWeight={700}>
        Students
      </Typography>
      {count !== undefined && (
        <Chip
          label={count}
          size="small"
          sx={{
            backgroundColor: "rgba(171,150,255,0.15)",
            color: "#AB96FF",
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
        backgroundColor: "#AB96FF",
        color: "#0a0619",
        fontWeight: 700,
        "&:hover": { backgroundColor: "#c4b4ff" },
      }}
    >
      Add Student
    </Button>
  </Stack>
);

export default StudentsHeader;
