import { useStudents } from "@hooks/useStudents";
import { Container } from "@mui/material";
import { useState } from "react";

import CreateStudentModal from "./CreateStudentModal";
import StudentsHeader from "./StudentsHeader";
import StudentsTable from "./StudentsTable";

const Students = () => {
  const { data: students, isLoading, isError } = useStudents();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Container maxWidth="lg" className="py-8">
      <StudentsHeader count={students?.length} onAdd={() => setModalOpen(true)} />
      <CreateStudentModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <StudentsTable students={students} isLoading={isLoading} isError={isError} />
    </Container>
  );
};

export default Students;
