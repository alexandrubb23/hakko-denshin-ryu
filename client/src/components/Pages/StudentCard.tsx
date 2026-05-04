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
import type { UseMutationResult } from "@tanstack/react-query";

import SkeletonText from "@components/SkeletonText/SkeletonText";
import { SUCCESS, SUCCESS_ALPHA_10 } from "@style/status.tokens";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  SKELETON_SX,
  SURFACE_BG,
} from "@style/tokens";

import StudentAvatar from "./StudentAvatar";

export type StudentCardUser = {
  id: string;
  name?: string;
  email?: string;
  image?: string | null;
  emailVerified?: boolean;
  createdAt?: string;
};

type Props = {
  user?: StudentCardUser;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  uploadMutation?: UseMutationResult<string, Error, File, unknown>;
  children?: React.ReactNode;
};

const StudentCard = ({
  user,
  isLoading,
  isError,
  errorMessage = "Failed to load profile. Please try again.",
  uploadMutation,
  children,
}: Props) => (
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
      <Typography color="error">{errorMessage}</Typography>
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
            <SkeletonText
              isLoading={isLoading}
              skeletonWidth={180}
              variant="h5"
              fontWeight={700}
            >
              {user?.name}
            </SkeletonText>
            <SkeletonText
              isLoading={isLoading}
              skeletonWidth={220}
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              {user?.email}
            </SkeletonText>
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
            <SkeletonText
              isLoading={isLoading}
              skeletonWidth={100}
              variant="body2"
            >
              {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
            </SkeletonText>
          </Stack>
        </Stack>

        {children && (
          <>
            <Divider sx={{ borderColor: BORDER_COLOR }} />
            {children}
          </>
        )}
      </Stack>
    )}
  </Paper>
);

export default StudentCard;
