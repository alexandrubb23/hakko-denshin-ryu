import DialogTitle, { type DialogTitleProps } from "@mui/material/DialogTitle";

import { PURPLE } from "@style/tokens";

const baseSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  color: PURPLE,
  fontWeight: 700,
} as const;

export default function ModalTitle({
  sx,
  children,
  ...props
}: DialogTitleProps) {
  return (
    <DialogTitle
      sx={[baseSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
      {...props}
    >
      {children}
    </DialogTitle>
  );
}
