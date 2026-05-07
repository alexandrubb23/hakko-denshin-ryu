import { type Student } from "@api/students";
import ConfirmDeleteModal from "@components/shared/ConfirmDeleteModal";
import DeleteMessage from "@components/shared/DeleteMessage";
import { useDeleteStudent } from "@features/admin/students/hooks/useDeleteStudent";
import useDeleteModal from "@hooks/useDeleteModal";

interface Props {
  open: boolean;
  student: Student;
  onClose: () => void;
}

const DeleteStudentModal = ({ open, student, onClose }: Props) => {
  const { mutate, isPending } = useDeleteStudent();
  const { error, handleClose, handleConfirm } = useDeleteModal({
    id: student.id,
    mutate,
    isPending,
    onClose,
    fallbackError: "Failed to delete student.",
  });

  return (
    <ConfirmDeleteModal
      open={open}
      title="Delete Student"
      message={<DeleteMessage name={student.name} />}
      onClose={handleClose}
      onConfirm={handleConfirm}
      isPending={isPending}
      error={error}
    />
  );
};

export default DeleteStudentModal;
