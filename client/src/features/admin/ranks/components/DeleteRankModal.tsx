import { type StudentRankEntry } from "@api/students";
import getServerError from "@utils/getServerError";
import { useState } from "react";

import { useDeleteStudentRank } from "@features/admin/ranks/hooks/useDeleteStudentRank";

import ConfirmDeleteModal from "@components/shared/ConfirmDeleteModal";

interface Props {
  studentId: string;
  entry: StudentRankEntry;
  open: boolean;
  onClose: () => void;
}

const DeleteRankModal = ({ studentId, entry, open, onClose }: Props) => {
  const { mutate, isPending } = useDeleteStudentRank(studentId);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (isPending) return;
    setError(null);
    onClose();
  };

  const handleConfirm = () => {
    setError(null);
    mutate(entry.id, {
      onSuccess: handleClose,
      onError: (err) =>
        setError(getServerError(err) ?? "Failed to delete rank entry."),
    });
  };

  return (
    <ConfirmDeleteModal
      open={open}
      title="Delete Rank Entry"
      message={
        <>
          Are you sure you want to remove{" "}
          <strong style={{ color: "white" }}>{entry.rank.name}</strong> awarded
          on{" "}
          <strong style={{ color: "white" }}>
            {new Date(entry.awardedAt).toLocaleDateString()}
          </strong>
          ? This action cannot be undone.
        </>
      }
      onClose={handleClose}
      onConfirm={handleConfirm}
      isPending={isPending}
      error={error}
    />
  );
};

export default DeleteRankModal;
