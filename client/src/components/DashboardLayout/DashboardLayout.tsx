import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router';

import LogoIcon from '@assets/images/logo.webp';
import useIsMobile from '@hooks/isMobile';
import { authClient } from '@lib/auth-client';
import { Role } from '@lib/role';
import { Routes } from '@lib/routes';
import { BORDER_COLOR, DARK_BG, SURFACE_BG } from '@style/tokens';

const DRAWER_WIDTH = 220;

const NAV_ITEMS = [
  { label: 'Dashboard', path: Routes.dashboard, icon: <DashboardIcon /> },
  { label: 'Techniques', path: Routes.techniques, icon: <MenuBookIcon /> },
  { label: 'Students', path: Routes.students, icon: <PeopleIcon />, adminOnly: true },
];

const DRAWER_PAPER_BG = SURFACE_BG;

const DRAWER_PAPER_SX = {
  width: DRAWER_WIDTH,
  boxSizing: 'border-box' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'space-between',
  backgroundColor: DRAWER_PAPER_BG,
  backdropFilter: 'blur(20px)',
  '& .MuiListItemIcon-root': { color: '#fff' },
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const isAdmin = isPending || session?.user.role === Role.admin;

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate(Routes.login, { replace: true });
  };

  const visibleItems = NAV_ITEMS.filter(item => !item.adminOnly || isAdmin);

  const drawerContent = (
    <>
      <Box>
        <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
          {isPending ? (
            <Box className='flex flex-col items-center gap-1'>
              <Skeleton variant='circular' width={40} height={40} sx={{ bgcolor: 'rgba(171,150,255,0.12)' }} />
              <Skeleton variant='text' width={80} sx={{ bgcolor: 'rgba(171,150,255,0.12)' }} />
            </Box>
          ) : (
            <Link to='/'>
              <Box className='flex flex-col items-center gap-1'>
                <Box component='img' src={LogoIcon} height={40} />
                <Typography variant='body2' fontWeight={700}>
                  Senshinkan
                </Typography>
              </Box>
            </Link>
          )}
        </Toolbar>

        <Divider />

        <List disablePadding>
          {visibleItems.map(({ label, path, icon }) => {
            const active = location.pathname === path;
            return (
              <ListItem key={path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={path}
                  selected={active}
                  onClick={() => isMobile && setMobileOpen(false)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(171, 150, 255, 0.15)',
                      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                        color: '#AB96FF',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(171, 150, 255, 0.08)',
                    },
                  }}
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
            <ListItemButton onClick={handleSignOut}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Sign Out' />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', backgroundColor: DARK_BG }}>
      {isMobile ? (
        <>
          <AppBar
            position='fixed'
            elevation={0}
            sx={{
              backgroundColor: DRAWER_PAPER_BG,
              backdropFilter: 'blur(20px)',
              borderBottom: `1px solid ${BORDER_COLOR}`,
            }}
          >
            <Toolbar sx={{ gap: 1 }}>
              <IconButton
                edge='start'
                onClick={() => setMobileOpen(prev => !prev)}
                sx={{ color: '#fff' }}
                aria-label='open navigation'
              >
                <MenuIcon />
              </IconButton>
              {isPending ? (
                <Box className='flex items-center gap-2'>
                  <Skeleton variant='circular' width={32} height={32} sx={{ bgcolor: 'rgba(171,150,255,0.12)' }} />
                  <Skeleton variant='text' width={80} sx={{ bgcolor: 'rgba(171,150,255,0.12)' }} />
                </Box>
              ) : (
                <Link to='/'>
                  <Box className='flex items-center gap-2'>
                    <Box component='img' src={LogoIcon} height={32} />
                    <Typography variant='body2' fontWeight={700}>
                      Senshinkan
                    </Typography>
                  </Box>
                </Link>
              )}
            </Toolbar>
          </AppBar>

          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                ...DRAWER_PAPER_SX,
                borderRight: `1px solid ${BORDER_COLOR}`,
              },
            }}
          >
            {drawerContent}
          </Drawer>

          <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Outlet />
          </Box>
        </>
      ) : (
        <>
          <Drawer
            variant='permanent'
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                ...DRAWER_PAPER_SX,
                borderRight: `1px solid ${BORDER_COLOR}`,
              },
            }}
          >
            {drawerContent}
          </Drawer>

          <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Outlet />
          </Box>
        </>
      )}
    </Box>
  );
};

export default DashboardLayout;
