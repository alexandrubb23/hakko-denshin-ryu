import { useStudents } from "@hooks/useStudents";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import CreateStudentModal from "./CreateStudentModal";
import StudentsTable from "./StudentsTable";

const Students = () => {
  const { data: students, isLoading, isError } = useStudents();
  const [modalOpen, setModalOpen] = useState(false);

  const showTable = isLoading || (students && students.length > 0);

  return (
    <Container maxWidth="lg" className="py-8">
      <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
        <PeopleIcon sx={{ color: "#AB96FF", fontSize: 32 }} />
        <Typography variant="h4" fontWeight={700}>
          Students
        </Typography>
        {students && (
          <Chip
            label={students.length}
            size="small"
            sx={{
              backgroundColor: "rgba(171,150,255,0.15)",
              color: "#AB96FF",
              fontWeight: 700,
            }}
          />
        )}
        <Box flexGrow={1} />
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{
            backgroundColor: "#AB96FF",
            color: "#0a0619",
            fontWeight: 700,
            "&:hover": { backgroundColor: "#c4b4ff" },
          }}
        >
          Add Student
        </Button>
      </Stack>

      <CreateStudentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {isError && (
        <Typography color="error" mt={4}>
          Failed to load students. Please try again.
        </Typography>
      )}

      {!isLoading && students?.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.04)",
          }}
        >
          <PeopleIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
          <Typography color="text.secondary">No students found.</Typography>
        </Paper>
      )}

      {showTable && (
        <StudentsTable students={students} isLoading={isLoading} />
      )}
    </Container>
  );
};

export default Students;
