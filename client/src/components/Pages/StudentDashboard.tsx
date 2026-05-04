import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { useMe } from "@hooks/useMe";
import { useUploadMyImage } from "@hooks/useUploadMyImage";
import { SUCCESS, SUCCESS_ALPHA_10 } from "@style/status.tokens";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  SKELETON_SX,
  SURFACE_BG,
} from "@style/tokens";

import DashboardStudentLinks from "./DashboardStudentLinks";
import MyDetailTabs from "./MyDetailTabs";
import MyEventChart from "./MyEventChart";
import StudentAvatar from "./StudentAvatar";

const StudentDashboard = () => {
  const { data: user, isLoading, isError } = useMe();
  const uploadMutation = useUploadMyImage();

  return (
    <Box sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: SURFACE_BG,
          border: `1px solid ${BORDER_COLOR}`,
          borderRadius: 3,
          backdropFilter: BACKDROP_BLUR,
          p: 4,
        }}
      >
        {isError ? (
          <Typography color="error">
            Failed to load profile. Please try again.
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
                studentId={user?.id ?? ""}
                name={user?.name}
                imageUrl={user?.image}
                isLoading={isLoading}
                uploadMutation={uploadMutation}
              />

              <Box>
                <Typography variant="h5" fontWeight={700}>
                  {isLoading ? (
                    <Skeleton width={180} sx={SKELETON_SX} />
                  ) : (
                    user?.name
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {isLoading ? (
                    <Skeleton width={220} sx={SKELETON_SX} />
                  ) : (
                    user?.email
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
                ) : user?.emailVerified ? (
                  <Chip
                    icon={<CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
                    label="Verified"
                    size="small"
                    sx={{
                      color: SUCCESS,
                      borderColor: SUCCESS,
                      backgroundColor: SUCCESS_ALPHA_10,
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
                    user && new Date(user.createdAt).toLocaleDateString()
                  )}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ borderColor: BORDER_COLOR }} />

            <DashboardStudentLinks />
          </Stack>
        )}
      </Paper>

      <MyEventChart />
      <MyDetailTabs />
    </Box>
  );
};

export default StudentDashboard;
