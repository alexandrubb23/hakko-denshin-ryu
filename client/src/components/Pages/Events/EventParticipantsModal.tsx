import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type { Event } from "@api/events";
import ModalDialog from "@components/ModalDialog/ModalDialog";
import ModalTitle from "@components/ModalTitle/ModalTitle";
import ParticipantsList from "@components/Pages/shared/ParticipantsList";
import { useEventParticipants } from "@hooks/useEventParticipants";
import { useStudents } from "@hooks/useStudents";
import { useUpsertEventParticipation } from "@hooks/useUpsertEventParticipation";
import {
  SUCCESS,
  SUCCESS_ALPHA_08,
  SUCCESS_ALPHA_40,
} from "@style/status.tokens";
import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_08,
  PURPLE_ALPHA_15,
} from "@style/tokens";

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
    <ModalDialog open={open} onClose={onClose} maxWidth="sm">
      <ModalTitle>
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
            backgroundColor: PURPLE_ALPHA_15,
            color: PURPLE,
            fontWeight: 700,
          }}
        />
      </ModalTitle>

      <Divider sx={{ borderColor: BORDER_COLOR }} />

      <DialogContent sx={{ p: 0, maxHeight: 480, overflowY: "auto" }}>
        <ParticipantsList
          students={students}
          isLoading={isLoading}
          renderAction={(student) => {
            const participation = participationMap.get(student.id);
            const attended = participation?.attended ?? false;
            return (
              <Button
                size="small"
                variant="outlined"
                disabled={isPending}
                onClick={() => toggle(student.id, attended)}
                startIcon={
                  attended ? (
                    <CheckCircleIcon sx={{ color: SUCCESS, fontSize: 16 }} />
                  ) : (
                    <RadioButtonUncheckedIcon
                      sx={{ color: "text.disabled", fontSize: 16 }}
                    />
                  )
                }
                sx={{
                  borderColor: attended ? SUCCESS_ALPHA_40 : BORDER_COLOR,
                  color: attended ? SUCCESS : "text.secondary",
                  minWidth: 110,
                  "&:hover": {
                    borderColor: attended ? SUCCESS : PURPLE,
                    backgroundColor: attended
                      ? SUCCESS_ALPHA_08
                      : PURPLE_ALPHA_08,
                  },
                }}
              >
                {attended ? "Attended" : "Mark"}
              </Button>
            );
          }}
        />
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
    </ModalDialog>
  );
};

export default EventParticipantsModal;
