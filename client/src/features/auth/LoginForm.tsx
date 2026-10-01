import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  type TextFieldProps,
  type TooltipProps,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { z } from "zod";

import ErrorTooltip from "@components/ui/ErrorTooltip/ErrorTooltip";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import useTranslateError from "@hooks/useTranslateError";
import { authClient } from "@lib/auth-client";
import { Routes } from "@lib/routes";
import type { IntlMessageID } from "i18n/messages";

import { doorButtonSx, doorFieldSx, doorFormSx } from "./LoginForm.style";
import PasswordToggle from "./PasswordToggle";

type Placement = TooltipProps["placement"];

// Narrow screens have no room beside the form: float the email error above
// it and the others below, so none covers a field being corrected
const ABOVE: Placement[] = ["top"];
const BELOW: Placement[] = ["bottom"];

const SERVER_ERROR_ID = "login-server-error";

// Validation messages are translation IDs, formatted when displayed
const loginSchema = z.object({
  email: z.email("auth.login.email.invalid" satisfies IntlMessageID),
  password: z
    .string()
    .min(1, "auth.login.password.required" satisfies IntlMessageID),
});

type LoginFormData = z.infer<typeof loginSchema>;

type DoorFieldProps = Omit<TextFieldProps, "error" | "label"> & {
  name: keyof LoginFormData;
  /** Stands in for a floating label, which doesn't scale with the door */
  label: string;
  invalid: boolean;
  /** The floating error, when this field shows it */
  error?: string;
  errorFallback: Placement[];
};

/** A field on the door, its error floating beside it */
const DoorField = ({
  name,
  label,
  invalid,
  error,
  errorFallback,
  slotProps,
  ...props
}: DoorFieldProps) => {
  const errorId = `login-${name}-error`;

  return (
    <ErrorTooltip
      id={errorId}
      message={error}
      fallbackPlacements={errorFallback}
    >
      <TextField
        id={name}
        name={name}
        placeholder={label}
        fullWidth
        size="small"
        error={invalid}
        sx={doorFieldSx}
        slotProps={{
          ...slotProps,
          // The placeholder isn't an accessible name
          htmlInput: {
            "aria-label": label,
            "aria-describedby": error ? errorId : undefined,
          },
        }}
        {...props}
      />
    </ErrorTooltip>
  );
};

/** Email and password sign-in; placed on the painted dojo door */
const LoginForm = () => {
  const intl = useIntl();
  const translateError = useTranslateError();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // A failed sign-in stops applying once the details change
  const registerField = (name: keyof LoginFormData) =>
    register(name, { onChange: () => setServerError(null) });

  const formatFieldError = (message?: string) =>
    message ? intl.formatMessage({ id: message as IntlMessageID }) : undefined;

  // One floating error at a time, for the first invalid field: stacked
  // tooltips would cover each other on narrow screens. Both fields still
  // show they're invalid.
  const emailError = formatFieldError(errors.email?.message);
  const passwordError = emailError
    ? undefined
    : formatFieldError(errors.password?.message);

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
          : translateError(error.message)
      );
      return;
    }

    navigate(Routes.dashboard, { replace: true });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={doorFormSx}
      noValidate
    >
      <DoorField
        {...registerField("email")}
        label={intl.formatMessage({ id: "common.email" })}
        type="email"
        autoComplete="email"
        invalid={!!errors.email}
        error={emailError}
        errorFallback={ABOVE}
      />

      <DoorField
        {...registerField("password")}
        label={intl.formatMessage({ id: "common.password" })}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        invalid={!!errors.password}
        error={passwordError}
        errorFallback={BELOW}
        slotProps={{
          input: {
            endAdornment: (
              <PasswordToggle
                shown={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
                size="small"
              />
            ),
          },
        }}
      />

      {/* A wrapper, as the tooltip can't follow a disabled button */}
      <ErrorTooltip
        id={SERVER_ERROR_ID}
        message={serverError}
        fallbackPlacements={BELOW}
      >
        <div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
            sx={doorButtonSx}
            aria-describedby={serverError ? SERVER_ERROR_ID : undefined}
          >
            <FormattedMessage
              id={isSubmitting ? "auth.login.submitting" : "auth.login.submit"}
            />
          </Button>
        </div>
      </ErrorTooltip>
    </Box>
  );
};

export default LoginForm;
