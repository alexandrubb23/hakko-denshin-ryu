import StudentForm, { StudentFormMode } from "./StudentForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateStudentModal = ({ open, onClose }: Props) => (
  <StudentForm mode={StudentFormMode.create} open={open} onClose={onClose} />
);

export default CreateStudentModal;
