import { zodResolver } from "@hookform/resolvers/zod";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { z } from "zod";

import { inviteApi } from "@api/invite";
import Header from "@components/ui/Header/Header";
import { Routes } from "@lib/routes";
import {
  ERROR_DARK_ALPHA_12,
  ERROR_DARK_TEXT,
  SUCCESS,
} from "@style/status.tokens";
import {
  BACKDROP_BLUR,
  BORDER_COLOR,
  BORDER_HOVER,
  DARK_BG,
  PURPLE,
  PURPLE_ALPHA_25,
  PURPLE_HOVER,
  SURFACE_BG,
  TEXT_MUTED,
} from "@style/tokens";

const setPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SetPasswordFormData = z.infer<typeof setPasswordFormSchema>;

const fieldSx: SxProps<Theme> = {
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

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [verifying, setVerifying] = useState(true);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordFormSchema),
  });

  useEffect(() => {
    if (!token) {
      setVerifyError("No invitation token found. This link may be invalid.");
      setVerifying(false);
      return;
    }

    inviteApi
      .verifyToken(token)
      .then(({ name }) => {
        setStudentName(name);
        setVerifying(false);
      })
      .catch(() => {
        setVerifyError(
          "This invitation link is invalid or has expired. Please contact your administrator.",
        );
        setVerifying(false);
      });
  }, [token]);

  const onSubmit = async ({ password }: SetPasswordFormData) => {
    setServerError(null);
    try {
      await inviteApi.setPassword({ token, password });
      setSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setServerError(
          "This invitation link is invalid or has expired. Please contact your administrator.",
        );
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100dvh",
          backgroundColor: DARK_BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 10,
          pb: 6,
        }}
      >
        <Container maxWidth="xs">
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: `1px solid ${BORDER_COLOR}`,
              backdropFilter: BACKDROP_BLUR,
              borderRadius: 3,
              p: 4,
            }}
          >
            {verifying && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress sx={{ color: PURPLE }} />
              </Box>
            )}

            {!verifying && verifyError && (
              <Box sx={{ textAlign: "center" }}>
                <Alert
                  severity="error"
                  sx={{
                    backgroundColor: ERROR_DARK_ALPHA_12,
                    color: ERROR_DARK_TEXT,
                    mb: 3,
                  }}
                >
                  {verifyError}
                </Alert>
                <Button
                  component={Link}
                  to={Routes.login}
                  variant="outlined"
                  sx={{
                    borderColor: BORDER_COLOR,
                    color: TEXT_MUTED,
                    "&:hover": { borderColor: PURPLE, color: PURPLE },
                  }}
                >
                  Go to login
                </Button>
              </Box>
            )}

            {!verifying && !verifyError && success && (
              <Box sx={{ textAlign: "center" }}>
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 56, color: SUCCESS, mb: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: SUCCESS, fontWeight: 700, mb: 1 }}
                >
                  Your password has been set
                </Typography>
                <Typography variant="body2" sx={{ color: TEXT_MUTED, mb: 3 }}>
                  You can now log in to the Senshinkan Romania portal.
                </Typography>
                <Button
                  component={Link}
                  to={Routes.login}
                  variant="contained"
                  sx={{
                    backgroundColor: PURPLE,
                    color: DARK_BG,
                    fontWeight: 700,
                    "&:hover": { backgroundColor: PURPLE_HOVER },
                  }}
                >
                  Go to login
                </Button>
              </Box>
            )}

            {!verifying && !verifyError && !success && (
              <>
                <Typography
                  variant="h6"
                  sx={{ color: PURPLE, fontWeight: 700, mb: 0.5 }}
                >
                  Set your password
                </Typography>
                {studentName && (
                  <Typography variant="body2" sx={{ color: TEXT_MUTED, mb: 3 }}>
                    Welcome, {studentName}
                  </Typography>
                )}

                {serverError && (
                  <Alert
                    severity="error"
                    sx={{
                      backgroundColor: ERROR_DARK_ALPHA_12,
                      color: ERROR_DARK_TEXT,
                      mb: 2,
                    }}
                  >
                    {serverError}
                  </Alert>
                )}

                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <TextField
                    id="set-password-password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={fieldSx}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((p) => !p)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <TextField
                    id="set-password-confirm"
                    label="Confirm Password"
                    type={showConfirm ? "text" : "password"}
                    fullWidth
                    {...register("confirmPassword")}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    sx={fieldSx}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirm((p) => !p)}
                              edge="end"
                            >
                              {showConfirm ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: PURPLE,
                      color: DARK_BG,
                      fontWeight: 700,
                      mt: 0.5,
                      "&:hover": { backgroundColor: PURPLE_HOVER },
                    }}
                  >
                    {isSubmitting ? "Setting password…" : "Set password"}
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default SetPassword;
