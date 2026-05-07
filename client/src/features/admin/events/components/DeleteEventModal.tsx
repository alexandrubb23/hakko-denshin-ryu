import type { Event } from "@api/events";
import ConfirmDeleteModal from "@components/shared/ConfirmDeleteModal";
import DeleteMessage from "@components/shared/DeleteMessage";
import { useDeleteEvent } from "@features/admin/events/hooks/useDeleteEvent";
import useDeleteModal from "@hooks/useDeleteModal";

interface Props {
  open: boolean;
  event: Event;
  onClose: () => void;
}

const DeleteEventModal = ({ open, event, onClose }: Props) => {
  const { mutate, isPending } = useDeleteEvent();
  const { error, handleClose, handleConfirm } = useDeleteModal({
    id: event.id,
    mutate,
    isPending,
    onClose,
    fallbackError: "Failed to delete event.",
  });

  return (
    <ConfirmDeleteModal
      open={open}
      title="Delete Event"
      message={<DeleteMessage name={event.name} />}
      onClose={handleClose}
      onConfirm={handleConfirm}
      isPending={isPending}
      error={error}
    />
  );
};

export default DeleteEventModal;
