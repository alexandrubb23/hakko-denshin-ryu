import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import type { Event } from "@api/events";
import { useEventParticipants } from "@hooks/useEventParticipants";
import { useStudents } from "@hooks/useStudents";
import { useUpsertEventParticipation } from "@hooks/useUpsertEventParticipation";
import {
  BORDER_COLOR,
  DARK_BG,
  PURPLE,
  SKELETON_SX,
  SURFACE_BG,
} from "@style/tokens";
import { getInitials } from "@utils/string";

interface Props {
  open: boolean;
  event: Event;
  onClose: () => void;
}

const EventParticipantsModal = ({ open, event, onClose }: Props) => {
  const { data: participants, isLoading: loadingParticipants } =
    useEventParticipants(event.id);
  const { data: students, isLoading: loadingStudents } = useStudents();
  const { mutate: upsert, isPending } = useUpsertEventParticipation(event.id);

  const participationMap = new Map(participants?.map((p) => [p.userId, p]));

  const isLoading = loadingParticipants || loadingStudents;

  const toggle = (userId: string, currentAttended: boolean) => {
    upsert({ userId, attended: !currentAttended });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: DARK_BG,
            backgroundImage: "none",
            border: `1px solid ${BORDER_COLOR}`,
            backdropFilter: "blur(20px)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: PURPLE,
          fontWeight: 700,
        }}
      >
        <GroupIcon fontSize="small" />
        <Stack flex={1}>
          <Typography fontWeight={700} component="span">
            Participants
          </Typography>
          <Typography variant="caption" color="text.secondary" component="span">
            {event.name}
          </Typography>
        </Stack>
        <Chip
          label={participants?.filter((p) => p.attended).length ?? 0}
          size="small"
          sx={{
            backgroundColor: "rgba(171,150,255,0.15)",
            color: PURPLE,
            fontWeight: 700,
          }}
        />
      </DialogTitle>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <DialogContent sx={{ p: 0, maxHeight: 480, overflowY: "auto" }}>
        {isLoading ? (
          <List>
            {Array.from({ length: 4 }).map((_, i) => (
              <ListItem key={i} divider sx={{ borderColor: BORDER_COLOR }}>
                <ListItemAvatar>
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={SKELETON_SX}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Skeleton variant="text" width={120} sx={SKELETON_SX} />
                  }
                  secondary={
                    <Skeleton variant="text" width={180} sx={SKELETON_SX} />
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : !students?.length ? (
          <Box p={4} textAlign="center">
            <Typography color="text.secondary">No students found.</Typography>
          </Box>
        ) : (
          <List disablePadding>
            {students.map((student) => {
              const participation = participationMap.get(student.id);
              const attended = participation?.attended ?? false;

              return (
                <ListItem
                  key={student.id}
                  divider
                  sx={{
                    borderColor: BORDER_COLOR,
                    "&:last-child": { borderBottom: 0 },
                    "&:hover": { backgroundColor: SURFACE_BG },
                    transition: "background-color 0.15s",
                  }}
                  secondaryAction={
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={isPending}
                      onClick={() => toggle(student.id, attended)}
                      startIcon={
                        attended ? (
                          <CheckCircleIcon
                            sx={{ color: "#4caf50", fontSize: 16 }}
                          />
                        ) : (
                          <RadioButtonUncheckedIcon
                            sx={{ color: "text.disabled", fontSize: 16 }}
                          />
                        )
                      }
                      sx={{
                        borderColor: attended
                          ? "rgba(76,175,80,0.4)"
                          : BORDER_COLOR,
                        color: attended ? "#4caf50" : "text.secondary",
                        minWidth: 110,
                        "&:hover": {
                          borderColor: attended ? "#4caf50" : PURPLE,
                          backgroundColor: attended
                            ? "rgba(76,175,80,0.08)"
                            : "rgba(171,150,255,0.08)",
                        },
                      }}
                    >
                      {attended ? "Attended" : "Mark"}
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      src={student.image ?? undefined}
                      sx={{
                        width: 36,
                        height: 36,
                        backgroundColor: "rgba(171,150,255,0.25)",
                        fontSize: 14,
                        fontWeight: 700,
                        color: PURPLE,
                      }}
                    >
                      {getInitials(student.name)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={600}>
                        {student.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {student.email}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </DialogContent>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        {isPending && <CircularProgress size={16} sx={{ color: PURPLE }} />}
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

export default EventParticipantsModal;
