import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Button,
  Chip,
  CircularProgress,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import type { Event } from "@api/events";
import ParticipantsList from "@components/shared/ParticipantsList";
import ModalDialog from "@components/ui/ModalDialog/ModalDialog";
import ModalTitle from "@components/ui/ModalTitle/ModalTitle";
import { useEventParticipants } from "@features/admin/events/hooks/useEventParticipants";
import { useUpsertEventParticipation } from "@features/admin/events/hooks/useUpsertEventParticipation";
import { useStudents } from "@features/admin/students/hooks/useStudents";
import {
  CHECK_ICON_SX,
  CLOSE_BUTTON_SX,
  CONTENT_SX,
  COUNT_CHIP_SX,
  DIVIDER_SX,
  FooterBox,
  SPINNER_SX,
  ToggleButton,
  UNCHECK_ICON_SX,
} from "./EventParticipantsModal.style";

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
          sx={COUNT_CHIP_SX}
        />
      </ModalTitle>

      <Divider sx={DIVIDER_SX} />

      <DialogContent sx={CONTENT_SX}>
        <ParticipantsList
          students={students}
          isLoading={isLoading}
          renderAction={(student) => {
            const participation = participationMap.get(student.id);
            const attended = participation?.attended ?? false;
            return (
              <ToggleButton
                attended={attended}
                size="small"
                variant="outlined"
                disabled={isPending}
                onClick={() => toggle(student.id, attended)}
                startIcon={
                  attended ? (
                    <CheckCircleIcon sx={CHECK_ICON_SX} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={UNCHECK_ICON_SX} />
                  )
                }
              >
                {attended ? "Attended" : "Mark"}
              </ToggleButton>
            );
          }}
        />
      </DialogContent>

      <Divider sx={DIVIDER_SX} />

      <FooterBox>
        {isPending && <CircularProgress size={16} sx={SPINNER_SX} />}
        <Button onClick={onClose} sx={CLOSE_BUTTON_SX}>
          Close
        </Button>
      </FooterBox>
    </ModalDialog>
  );
};

export default EventParticipantsModal;
