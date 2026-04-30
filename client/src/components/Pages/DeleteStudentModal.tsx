import axios from "axios";
import { useState } from "react";

import { type Student } from "@api/students";
import { useDeleteStudent } from "@hooks/useDeleteStudent";

import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface Props {
  open: boolean;
  student: Student;
  onClose: () => void;
}

const DeleteStudentModal = ({ open, student, onClose }: Props) => {
  const { mutate, isPending } = useDeleteStudent();
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (isPending) return;
    setError(null);
    onClose();
  };

  const handleConfirm = () => {
    setError(null);
    mutate(student.id, {
      onSuccess: onClose,
      onError: (err) => {
        setError(
          axios.isAxiosError(err)
            ? (err.response?.data?.error ?? "Failed to delete student.")
            : "An unexpected error occurred."
        );
      },
    });
  };

  return (
    <ConfirmDeleteModal
      open={open}
      title="Delete Student"
      message={
        <>
          Are you sure you want to delete{" "}
          <strong style={{ color: "white" }}>{student.name}</strong>? This
          action cannot be undone.
        </>
      }
      onClose={handleClose}
      onConfirm={handleConfirm}
      isPending={isPending}
      error={error}
    />
  );
};

export default DeleteStudentModal;
