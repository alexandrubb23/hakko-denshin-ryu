import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";

import { useStudent } from "@features/admin/students/hooks/useStudent";
import { Routes } from "@lib/routes";
import { PURPLE, PURPLE_ALPHA_08 } from "@style/tokens";

import StudentCard from "./StudentCard";
import StudentDetailTabs from "./StudentDetailTabs";

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: student, isLoading, isError } = useStudent(id!);

  return (
    <Box sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(Routes.students)}
        sx={{
          color: PURPLE,
          mb: 3,
          "&:hover": { backgroundColor: PURPLE_ALPHA_08 },
        }}
      >
        Back to Students
      </Button>

      <StudentCard
        user={student}
        isLoading={isLoading}
        isError={isError}
        errorMessage="Failed to load student. Please try again."
      />

      <StudentDetailTabs studentId={id!} />
    </Box>
  );
};

export default StudentDetail;
