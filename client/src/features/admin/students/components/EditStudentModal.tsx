import { type Student } from "@api/students";
import StudentForm, { StudentFormMode } from "./StudentForm";

interface Props {
  open: boolean;
  onClose: () => void;
  student: Student;
}

const EditStudentModal = ({ open, onClose, student }: Props) => (
  <StudentForm
    mode={StudentFormMode.edit}
    open={open}
    onClose={onClose}
    student={student}
  />
);

export default EditStudentModal;
