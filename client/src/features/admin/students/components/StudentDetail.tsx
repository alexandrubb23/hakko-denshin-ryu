import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { useStudent } from "@features/admin/students/hooks/useStudent";
import { Routes } from "@lib/routes";
import { PURPLE, PURPLE_ALPHA_08 } from "@style/tokens";

import StudentCard from "./StudentCard";
import StudentDetailTabs from "./StudentDetailTabs";

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const intl = useIntl();
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
        <FormattedMessage id="admin.students.detail.back" />
      </Button>

      <StudentCard
        user={student}
        isLoading={isLoading}
        isError={isError}
        errorMessage={intl.formatMessage({
          id: "admin.students.detail.error",
        })}
      />

      <StudentDetailTabs studentId={id!} />
    </Box>
  );
};

export default StudentDetail;
