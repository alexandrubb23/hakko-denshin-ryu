import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

import { useMe } from "@hooks/useMe";
import { useUploadMyImage } from "@hooks/useUploadMyImage";
import { Routes } from "@lib/routes";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  PURPLE,
  SKELETON_SX,
  SURFACE_BG,
} from "@style/tokens";

import MyDetailTabs from "./MyDetailTabs";
import MyEventChart from "./MyEventChart";
import StudentAvatar from "./StudentAvatar";

const STUDENT_LINKS = [
  { label: "Techniques", to: Routes.techniques, Icon: SportsKabaddiIcon },
  { label: "Kyu Program", to: Routes.kyuProgram, Icon: EmojiEventsIcon },
] as const;

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
                    user && new Date(user.createdAt).toLocaleDateString()
                  )}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ borderColor: BORDER_COLOR }} />

            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 2, textTransform: "uppercase", letterSpacing: 1 }}
              >
                Quick links
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {STUDENT_LINKS.map(({ label, to, Icon }) => (
                  <Card
                    key={to}
                    sx={{
                      flex: "1 1 140px",
                      backgroundColor: SURFACE_BG,
                      border: `1px solid ${BORDER_COLOR}`,
                      backdropFilter: "blur(20px)",
                      backgroundImage: "none",
                      transition: "border-color 200ms",
                      "&:hover": { borderColor: PURPLE },
                    }}
                  >
                    <CardActionArea component={Link} to={to} sx={{ p: 2.5 }}>
                      <CardContent
                        sx={{
                          p: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Icon sx={{ fontSize: 36, color: PURPLE }} />
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          textAlign="center"
                        >
                          {label}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </Box>
          </Stack>
        )}
      </Paper>

      <MyEventChart />
      <MyDetailTabs />
    </Box>
  );
};

export default StudentDashboard;
