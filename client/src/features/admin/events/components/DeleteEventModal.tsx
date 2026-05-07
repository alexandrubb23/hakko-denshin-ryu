import axios from "axios";
import { useState } from "react";

import type { Event } from "@api/events";
import { useDeleteEvent } from "@features/admin/events/hooks/useDeleteEvent";
import ConfirmDeleteModal from "@components/shared/ConfirmDeleteModal";

interface Props {
  open: boolean;
  event: Event;
  onClose: () => void;
}

const DeleteEventModal = ({ open, event, onClose }: Props) => {
  const { mutate, isPending } = useDeleteEvent();
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (isPending) return;
    setError(null);
    onClose();
  };

  const handleConfirm = () => {
    setError(null);
    mutate(event.id, {
      onSuccess: onClose,
      onError: (err) => {
        setError(
          axios.isAxiosError(err)
            ? (err.response?.data?.error ?? "Failed to delete event.")
            : "An unexpected error occurred."
        );
      },
    });
  };

  return (
    <ConfirmDeleteModal
      open={open}
      title="Delete Event"
      message={
        <>
          Are you sure you want to delete{" "}
          <strong style={{ color: "white" }}>{event.name}</strong>? This action
          cannot be undone.
        </>
      }
      onClose={handleClose}
      onConfirm={handleConfirm}
      isPending={isPending}
      error={error}
    />
  );
};

export default DeleteEventModal;
