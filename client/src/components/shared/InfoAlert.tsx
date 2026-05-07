import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Alert, type AlertProps } from "@mui/material";

import { BORDER_COLOR, PURPLE, PURPLE_ALPHA_08 } from "@style/tokens";

type Props = Omit<AlertProps, "severity" | "icon"> & {
  children: React.ReactNode;
};

const infoAlertSx = {
  backgroundColor: PURPLE_ALPHA_08,
  color: PURPLE,
  border: `1px solid ${BORDER_COLOR}`,
  "& .MuiAlert-icon": { color: PURPLE },
} as const;

const InfoAlert = ({ sx, children, ...props }: Props) => (
  <Alert
    icon={<InfoOutlinedIcon fontSize="inherit" />}
    severity="info"
    sx={{ mt: 2, ...infoAlertSx, ...sx }}
    {...props}
  >
    {children}
  </Alert>
);

export default InfoAlert;
