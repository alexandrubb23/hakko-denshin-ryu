import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";

import { useStudent } from "@hooks/useStudent";
import { Routes } from "@lib/routes";
import { BORDER_COLOR, PURPLE, SKELETON_SX, SURFACE_BG } from "@style/tokens";
import StudentAvatar from "./StudentAvatar";
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
          "&:hover": { backgroundColor: "rgba(171,150,255,0.08)" },
        }}
      >
        Back to Students
      </Button>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: SURFACE_BG,
          border: `1px solid ${BORDER_COLOR}`,
          borderRadius: 3,
          backdropFilter: "blur(20px)",
          p: 4,
        }}
      >
        {isError ? (
          <Typography color="error">
            Failed to load student. Please try again.
          </Typography>
        ) : (
          <Stack spacing={3}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "center", sm: "center" }}
              spacing={2.5}
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              <StudentAvatar
                studentId={id!}
                name={student?.name}
                imageUrl={student?.image}
                isLoading={isLoading}
              />

              <Box>
                <Typography variant="h5" fontWeight={700}>
                  {isLoading ? (
                    <Skeleton width={180} sx={SKELETON_SX} />
                  ) : (
                    student?.name
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {isLoading ? (
                    <Skeleton width={220} sx={SKELETON_SX} />
                  ) : (
                    student?.email
                  )}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ borderColor: BORDER_COLOR }} />

            <Stack spacing={2}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  Email verification
                </Typography>
                {isLoading ? (
                  <Skeleton
                    variant="rounded"
                    width={90}
                    height={24}
                    sx={SKELETON_SX}
                  />
                ) : student?.emailVerified ? (
                  <Chip
                    icon={<CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
                    label="Verified"
                    size="small"
                    sx={{
                      color: "#4caf50",
                      borderColor: "#4caf50",
                      backgroundColor: "rgba(76,175,80,0.1)",
                    }}
                    variant="outlined"
                  />
                ) : (
                  <Chip
                    icon={<RadioButtonUncheckedIcon sx={{ fontSize: 16 }} />}
                    label="Not verified"
                    size="small"
                    sx={{ color: "text.disabled", borderColor: BORDER_COLOR }}
                    variant="outlined"
                  />
                )}
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  Member since
                </Typography>
                <Typography variant="body2">
                  {isLoading ? (
                    <Skeleton width={100} sx={SKELETON_SX} />
                  ) : (
                    student && new Date(student.createdAt).toLocaleDateString()
                  )}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Paper>

      <StudentDetailTabs studentId={id!} />
    </Box>
  );
};

export default StudentDetail;
