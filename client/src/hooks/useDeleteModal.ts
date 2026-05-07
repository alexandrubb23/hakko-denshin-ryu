import axios from "axios";
import { useState } from "react";

interface Options {
  id: string;
  mutate: (
    id: string,
    callbacks: { onSuccess: () => void; onError: (err: unknown) => void }
  ) => void;
  isPending: boolean;
  onClose: () => void;
  fallbackError: string;
}

const useDeleteModal = ({
  id,
  mutate,
  isPending,
  onClose,
  fallbackError,
}: Options) => {
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (isPending) return;
    setError(null);
    onClose();
  };

  const handleConfirm = () => {
    setError(null);
    mutate(id, {
      onSuccess: onClose,
      onError: (err) => {
        setError(
          axios.isAxiosError(err)
            ? (err.response?.data?.error ?? fallbackError)
            : "An unexpected error occurred."
        );
      },
    });
  };

  return { error, handleClose, handleConfirm };
};

export default useDeleteModal;
