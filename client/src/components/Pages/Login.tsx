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
import Header from "@components/Header/Header";
import { authClient } from "@lib/auth-client";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const PURPLE = "#AB96FF";

const bgZoom = keyframes`
  from { transform: scale(1); }
  to   { transform: scale(1.15); }
`;

const darkFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.04)",
    "& fieldset": { borderColor: "rgba(171,150,255,0.25)" },
    "&:hover fieldset": { borderColor: "rgba(171,150,255,0.55)" },
    "&.Mui-focused fieldset": { borderColor: PURPLE },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
  "& .MuiInputLabel-root.Mui-focused": { color: PURPLE },
  "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.5)" },
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
    return <Navigate to="/dashboard" replace />;
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

    navigate("/dashboard", { replace: true });
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
            backgroundColor: "rgba(10, 6, 25, 0.65)",
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
              backgroundColor: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(171,150,255,0.2)`,
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
                  backgroundColor: "rgba(211,47,47,0.15)",
                  color: "#ff8a80",
                  border: "1px solid rgba(211,47,47,0.3)",
                  "& .MuiAlert-icon": { color: "#ff8a80" },
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
                            color: "rgba(255,255,255,0.5)",
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
