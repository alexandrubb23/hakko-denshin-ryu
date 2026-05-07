import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import { z } from "zod";

import bgImage from "@assets/images/180.webp";
import Header from "@components/ui/Header/Header";
import { authClient } from "@lib/auth-client";
import { Routes } from "@lib/routes";
import {
  ERROR_DARK_ALPHA_15,
  ERROR_DARK_TEXT_LIGHT,
} from "@style/status.tokens";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG_OVERLAY,
  PURPLE,
  PURPLE_ALPHA_25,
  SURFACE_BG,
  TEXT_MUTED,
} from "@style/tokens";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const bgZoom = keyframes`
  from { transform: scale(1); }
  to   { transform: scale(1.15); }
`;

const darkFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: SURFACE_BG,
    "& fieldset": { borderColor: PURPLE_ALPHA_25 },
    "&:hover fieldset": { borderColor: BORDER_HOVER },
    "&.Mui-focused fieldset": { borderColor: PURPLE },
  },
  "& .MuiInputLabel-root": { color: TEXT_MUTED },
  "& .MuiInputLabel-root.Mui-focused": { color: PURPLE },
  "& .MuiSvgIcon-root": { color: TEXT_MUTED },
};

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  if (isSessionLoading) {
    return (
      <Box className="flex items-center justify-center min-h-dvh">
        <CircularProgress sx={{ color: PURPLE }} />
      </Box>
    );
  }

  if (session) {
    return <Navigate to={Routes.dashboard} replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    const { error } = await authClient.signIn.email(data);

    if (error) {
      setServerError(
        error.message ?? "Invalid email or password. Please try again."
      );
      return;
    }

    navigate(Routes.dashboard, { replace: true });
  };

  return (
    <>
      {/* Fixed background with zoom-in animation — clipped independently */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: `${bgZoom} 20s ease-out forwards`,
            willChange: "transform",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: DARK_BG_OVERLAY,
          }}
        />
      </Box>

      {/* Page content */}
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <Container
          maxWidth="xs"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              backgroundColor: SURFACE_BG,
              backdropFilter: BACKDROP_BLUR,
              border: `1px solid ${BORDER_COLOR}`,
              borderRadius: 2,
            }}
          >
            <Box className="flex flex-col items-center gap-1">
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ color: "#fff", letterSpacing: 1 }}
              >
                Log In
              </Typography>
              <Box
                sx={{
                  width: 40,
                  height: 2,
                  backgroundColor: PURPLE,
                  borderRadius: 1,
                }}
              />
            </Box>

            {serverError && (
              <Alert
                severity="error"
                onClose={() => setServerError(null)}
                sx={{
                  backgroundColor: ERROR_DARK_ALPHA_15,
                  color: ERROR_DARK_TEXT_LIGHT,
                  border: "1px solid rgba(211,47,47,0.3)",
                  "& .MuiAlert-icon": { color: ERROR_DARK_TEXT_LIGHT },
                }}
              >
                {serverError}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              noValidate
            >
              <TextField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={darkFieldSx}
              />

              <TextField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                fullWidth
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={darkFieldSx}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          sx={{
                            color: TEXT_MUTED,
                            "&:hover": { color: "#fff" },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : null
                }
                sx={{ mt: 1 }}
              >
                {isSubmitting ? "Signing in…" : "Sign In"}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Login;
