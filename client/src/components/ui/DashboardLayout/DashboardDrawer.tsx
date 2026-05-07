import { Drawer, DrawerProps } from "@mui/material";

import { permanentDrawerSx, temporaryDrawerSx } from "./DashboardDrawer.style";
import DrawerContent from "./DrawerContent";

interface Props {
  variant: DrawerProps["variant"];
  open?: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

const DashboardDrawer = ({ variant, open, onClose, onSignOut }: Props) => {
  const isTemporary = variant === "temporary";

  return (
    <Drawer
      variant={variant}
      open={isTemporary ? open : undefined}
      onClose={isTemporary ? onClose : undefined}
      ModalProps={isTemporary ? { keepMounted: true } : undefined}
      sx={isTemporary ? temporaryDrawerSx : permanentDrawerSx}
    >
      <DrawerContent onClose={onClose} onSignOut={onSignOut} />
    </Drawer>
  );
};

export default DashboardDrawer;
