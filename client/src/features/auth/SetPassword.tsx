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
import { useIntl } from "react-intl";
import { Link, useSearchParams } from "react-router";
import { z } from "zod";

import { inviteApi } from "@api/invite";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
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
import type { IntlMessageID } from "i18n/messages";

// Validation messages are translation IDs, formatted when displayed
const setPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "error.validation.password.min8" satisfies IntlMessageID),
    confirmPassword: z
      .string()
      .min(1, "auth.setPassword.confirm.required" satisfies IntlMessageID),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "auth.setPassword.mismatch" satisfies IntlMessageID,
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
  const intl = useIntl();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [verifying, setVerifying] = useState(true);
  const [verifyError, setVerifyError] = useState<IntlMessageID | null>(null);
  const [studentName, setStudentName] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<IntlMessageID | null>(null);
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
      setVerifyError("auth.setPassword.error.noToken");
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
        setVerifyError("auth.setPassword.error.invalidLink");
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
        setServerError("auth.setPassword.error.invalidLink");
      } else {
        setServerError("error.generic");
      }
    }
  };

  const formatFieldError = (message?: string) =>
    message ? intl.formatMessage({ id: message as IntlMessageID }) : undefined;

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
                  <FormattedMessage id={verifyError} />
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
                  <FormattedMessage id="auth.setPassword.goToLogin" />
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
                  <FormattedMessage id="auth.setPassword.success.title" />
                </Typography>
                <Typography variant="body2" sx={{ color: TEXT_MUTED, mb: 3 }}>
                  <FormattedMessage id="auth.setPassword.success.description" />
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
                  <FormattedMessage id="auth.setPassword.goToLogin" />
                </Button>
              </Box>
            )}

            {!verifying && !verifyError && !success && (
              <>
                <Typography
                  variant="h6"
                  sx={{ color: PURPLE, fontWeight: 700, mb: 0.5 }}
                >
                  <FormattedMessage id="auth.setPassword.title" />
                </Typography>
                {studentName && (
                  <Typography variant="body2" sx={{ color: TEXT_MUTED, mb: 3 }}>
                    <FormattedMessage
                      id="auth.setPassword.welcome"
                      values={{ name: studentName }}
                    />
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
                    <FormattedMessage id={serverError} />
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
                    label={intl.formatMessage({ id: "common.password" })}
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={formatFieldError(errors.password?.message)}
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
                    label={intl.formatMessage({
                      id: "auth.setPassword.confirm.label",
                    })}
                    type={showConfirm ? "text" : "password"}
                    fullWidth
                    {...register("confirmPassword")}
                    error={!!errors.confirmPassword}
                    helperText={formatFieldError(
                      errors.confirmPassword?.message,
                    )}
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
                    <FormattedMessage
                      id={
                        isSubmitting
                          ? "auth.setPassword.submitting"
                          : "auth.setPassword.submit"
                      }
                    />
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
