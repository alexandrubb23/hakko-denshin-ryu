import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import { z } from "zod";

import Header from "@components/ui/Header/Header";
import { authClient } from "@lib/auth-client";
import { Routes } from "@lib/routes";

import {
  AccentBar,
  BgClipBox,
  BgImageBox,
  BgOverlayBox,
  CenteredContainer,
  LoginErrorAlert,
  LoginPaper,
  PageBox,
  SPINNER_SX,
  SubmitButton,
  TITLE_SX,
  TogglePasswordButton,
  darkFieldSx,
} from "./Login.style";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

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
        <CircularProgress sx={SPINNER_SX} />
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
      <BgClipBox>
        <BgImageBox />
        <BgOverlayBox />
      </BgClipBox>

      {/* Page content */}
      <PageBox>
        <Header />

        <CenteredContainer maxWidth="xs">
          <LoginPaper elevation={0}>
            <Box className="flex flex-col items-center gap-1">
              <Typography variant="h5" fontWeight={700} sx={TITLE_SX}>
                Log In
              </Typography>
              <AccentBar />
            </Box>

            {serverError && (
              <LoginErrorAlert
                severity="error"
                onClose={() => setServerError(null)}
              >
                {serverError}
              </LoginErrorAlert>
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
                        <TogglePasswordButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </TogglePasswordButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <SubmitButton
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
              >
                {isSubmitting ? "Signing in…" : "Sign In"}
              </SubmitButton>
            </Box>
          </LoginPaper>
        </CenteredContainer>
      </PageBox>
    </>
  );
};

export default Login;
