import Dialog, { type DialogProps } from "@mui/material/Dialog";
import type { SxProps, Theme } from "@mui/material/styles";

import { BACKDROP_BLUR, BORDER_COLOR, DARK_BG } from "@style/tokens";

const basePaperSx = {
  backgroundColor: DARK_BG,
  backgroundImage: "none",
  border: `1px solid ${BORDER_COLOR}`,
  backdropFilter: BACKDROP_BLUR,
} as const;

type Props = DialogProps & {
  /** Extra sx merged on top of the base paper styles */
  paperSx?: SxProps<Theme>;
};

export default function ModalDialog({
  paperSx,
  fullWidth = true,
  children,
  ...props
}: Props) {
  return (
    <Dialog
      fullWidth={fullWidth}
      slotProps={{
        paper: {
          sx: paperSx
            ? [basePaperSx, ...(Array.isArray(paperSx) ? paperSx : [paperSx])]
            : basePaperSx,
        },
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
}
