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
import { useIntl } from "react-intl";
import { Navigate, useNavigate } from "react-router";
import { z } from "zod";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import Header from "@components/ui/Header/Header";
import useTranslateError from "@hooks/useTranslateError";
import { authClient } from "@lib/auth-client";
import { Routes } from "@lib/routes";
import type { IntlMessageID } from "i18n/messages";

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

// Validation messages are translation IDs, formatted when displayed
const loginSchema = z.object({
  email: z.email("auth.login.email.invalid" satisfies IntlMessageID),
  password: z
    .string()
    .min(1, "auth.login.password.required" satisfies IntlMessageID),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const intl = useIntl();
  const translateError = useTranslateError();
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

  const formatFieldError = (message?: string) =>
    message ? intl.formatMessage({ id: message as IntlMessageID }) : undefined;

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    const { error } = await authClient.signIn.email(data);

    if (error) {
      const invalidCredentials = intl.formatMessage({
        id: "auth.login.error.invalidCredentials",
      });
      setServerError(
        error.code === "INVALID_EMAIL_OR_PASSWORD" || !error.message
          ? invalidCredentials
          : translateError(error.message),
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
                <FormattedMessage id="auth.login.title" />
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
                label={intl.formatMessage({ id: "common.email" })}
                type="email"
                autoComplete="email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={formatFieldError(errors.email?.message)}
                sx={darkFieldSx}
              />

              <TextField
                id="password"
                label={intl.formatMessage({ id: "common.password" })}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                fullWidth
                {...register("password")}
                error={!!errors.password}
                helperText={formatFieldError(errors.password?.message)}
                sx={darkFieldSx}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <TogglePasswordButton
                          aria-label={intl.formatMessage({
                            id: showPassword
                              ? "auth.password.hide"
                              : "auth.password.show",
                          })}
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
                <FormattedMessage
                  id={
                    isSubmitting ? "auth.login.submitting" : "auth.login.submit"
                  }
                />
              </SubmitButton>
            </Box>
          </LoginPaper>
        </CenteredContainer>
      </PageBox>
    </>
  );
};

export default Login;
