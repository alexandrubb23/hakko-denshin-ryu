import EventNoteIcon from "@mui/icons-material/EventNote";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { PURPLE } from "@style/tokens";

interface EventsHeaderProps {
  count: number | undefined;
  onAdd: () => void;
}

const EventsHeader = ({ count, onAdd }: EventsHeaderProps) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    alignItems={{ xs: "flex-start", sm: "center" }}
    gap={1.5}
    mb={3}
  >
    <Stack direction="row" alignItems="center" gap={1.5}>
      <EventNoteIcon sx={{ color: PURPLE, fontSize: 32 }} />
      <Typography variant="h4" fontWeight={700}>
        Events
      </Typography>
      {count !== undefined && (
        <Chip
          label={count}
          size="small"
          sx={{
            backgroundColor: "rgba(171,150,255,0.15)",
            color: PURPLE,
            fontWeight: 700,
          }}
        />
      )}
    </Stack>
    <Box flexGrow={1} />
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={onAdd}
      sx={{
        backgroundColor: PURPLE,
        color: "#0a0619",
        fontWeight: 700,
        "&:hover": { backgroundColor: "#c4b4ff" },
      }}
    >
      Add Event
    </Button>
  </Stack>
);

export default EventsHeader;
