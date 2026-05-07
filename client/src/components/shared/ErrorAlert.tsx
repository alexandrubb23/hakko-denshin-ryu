import { Alert, type AlertProps } from "@mui/material";

import {
  ERROR_DARK_ALPHA_12,
  ERROR_DARK_ALPHA_30,
  ERROR_DARK_TEXT,
} from "@style/status.tokens";

type Props = Omit<AlertProps, "severity"> & {
  children: React.ReactNode;
};

const errorAlertSx = {
  backgroundColor: ERROR_DARK_ALPHA_12,
  color: ERROR_DARK_TEXT,
  border: `1px solid ${ERROR_DARK_ALPHA_30}`,
  "& .MuiAlert-icon": { color: ERROR_DARK_TEXT },
} as const;

const ErrorAlert = ({ sx, children, ...props }: Props) => (
  <Alert severity="error" sx={{ mt: 2, ...errorAlertSx, ...sx }} {...props}>
    {children}
  </Alert>
);

export default ErrorAlert;
