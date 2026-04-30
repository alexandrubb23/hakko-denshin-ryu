import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";

import { useStudent } from "@hooks/useStudent";
import { Routes } from "@lib/routes";
import { BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";
import StudentDetailTabs from "./StudentDetailTabs";
const SKEL = { bgcolor: "rgba(171,150,255,0.12)" };

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: student, isLoading, isError } = useStudent(id!);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
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
            <Stack direction="row" alignItems="center" spacing={2.5}>
              {isLoading ? (
                <Skeleton variant="circular" width={64} height={64} sx={SKEL} />
              ) : (
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: "rgba(171,150,255,0.25)",
                    fontSize: 22,
                    fontWeight: 700,
                    color: PURPLE,
                  }}
                >
                  {student ? getInitials(student.name) : <PersonIcon />}
                </Avatar>
              )}

              <Box>
                <Typography variant="h5" fontWeight={700}>
                  {isLoading ? (
                    <Skeleton width={180} sx={SKEL} />
                  ) : (
                    student?.name
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {isLoading ? (
                    <Skeleton width={220} sx={SKEL} />
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
                    sx={SKEL}
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
                    <Skeleton width={100} sx={SKEL} />
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
    </Container>
  );
};

export default StudentDetail;

