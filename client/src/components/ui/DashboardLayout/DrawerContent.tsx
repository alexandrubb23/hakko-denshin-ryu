import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router";

import LogoIcon from "@assets/images/logo.webp";
import useIsMobile from "@hooks/isMobile";
import useIsAdmin from "@hooks/useIsAdmin";
import { Routes } from "@lib/routes";
import {
  PURPLE,
  PURPLE_ALPHA_08,
  PURPLE_ALPHA_15,
  SKELETON_SX,
} from "@style/tokens";

const NAV_ITEMS = [
  { label: "Dashboard", path: Routes.dashboard, icon: <DashboardIcon /> },
  {
    label: "Events",
    path: Routes.adminEvents,
    icon: <EventIcon />,
    adminOnly: true,
  },
  { label: "Techniques", path: Routes.techniques, icon: <MenuBookIcon /> },
  { label: "Kyu Program", path: Routes.kyuProgram, icon: <EmojiEventsIcon /> },
  {
    label: "Students",
    path: Routes.students,
    icon: <PeopleIcon />,
    adminOnly: true,
  },
];

const SELECTED_SX = {
  "&.Mui-selected": {
    backgroundColor: PURPLE_ALPHA_15,
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      color: PURPLE,
    },
  },
  "&:hover": {
    backgroundColor: PURPLE_ALPHA_08,
  },
} as const;

type DrawerContentProps = {
  onClose: () => void;
  onSignOut: () => void;
};

const DrawerContent = ({ onClose, onSignOut }: DrawerContentProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isAdmin, isPending } = useIsAdmin();

  const showAdminItems = isPending || isAdmin;
  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || showAdminItems
  );

  return (
    <>
      <Box>
        <Toolbar sx={{ justifyContent: "center", py: 2 }}>
          {isPending ? (
            <Box className="flex flex-col items-center gap-1">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={SKELETON_SX}
              />
              <Skeleton variant="text" width={80} sx={SKELETON_SX} />
            </Box>
          ) : (
            <Box className="flex flex-col items-center gap-2">
              <Link to="/">
                <Box className="flex flex-col items-center gap-1">
                  <Box component="img" src={LogoIcon} height={40} />
                  <Typography variant="body2" fontWeight={700}>
                    Senshinkan
                  </Typography>
                </Box>
              </Link>
            </Box>
          )}
        </Toolbar>

        <Divider />

        <List disablePadding>
          {visibleItems.map(({ label, path, icon }) => {
            const active =
              path === Routes.dashboard
                ? location.pathname === path
                : location.pathname.startsWith(path);
            return (
              <ListItem key={path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={path}
                  selected={active}
                  onClick={() => isMobile && onClose()}
                  sx={SELECTED_SX}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box>
        <Divider />
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton onClick={onSignOut}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default DrawerContent;
