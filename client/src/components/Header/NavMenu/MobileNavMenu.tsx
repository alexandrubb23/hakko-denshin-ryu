import { Box, FormLabel, styled } from '@mui/material';

import useMenuStore from '@store/useMenuStore';
import ListPages from './ListPages';

const commonStyle = () => ({
  backgroundColor: 'var(--foreground-color)',
  borderRadius: 'var(--bar-height)',
  boxSizing: 'border-box',
  content: '""',
  height: 'var(--bar-height)',
  width: 'var(--bar-width)',
  transition:
    'opacity var(--animation-timing), width var(--animation-timing), rotate var(--animation-timing), translate var(--animation-timing), background-color var(--animation-timing)',
  transformOrigin: 'right center',
});

const FormLabelStyled = styled(FormLabel)<{ open: boolean }>(({ open }) => ({
  '--x-width': 'calc(var(--hamburger-height) * 1.41421356237)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--hamburger-gap)',
  right: 'var(--hamburger-margin)',
  zIndex: 2,
  cursor: 'pointer',
  '::before': {
    ...commonStyle(),
    ...(open && {
      rotate: '-45deg',
      width: 'var(--x-width)',
      translate: '0 calc(var(--bar-height) / -2)',
    }),
  },
  '::after': {
    ...commonStyle(),
    ...(open && {
      rotate: '45deg',
      translate: '0 calc(var(--bar-height) / 2)',
      width: 'var(--x-width)',
    }),
  },
  input: {
    ...commonStyle(),
    appearance: 'none',
    margin: 0,
    opacity: open ? 0 : 1,
    outline: 'none',
    padding: 0,
    pointerEvents: 'none',
  },
}));

const BoxStyled = styled(Box)<{ open: boolean }>(({ open }) => ({
  alignItems: 'center',
  backgroundColor: 'var(--background-color)',
  backdropFilter: 'blur(var(--backdrop-filter))',
  display: 'flex',
  flexDirection: 'column',
  right: 0,
  marginTop: 'calc(var(--hamburger-margin) + var(--hamburger-margin) + 1rem)',
  minHeight: '100vh',
  overflow: 'hidden',
  position: 'absolute',
  top: -52,
  transition:
    'transform var(--animation-timing), width var(--animation-timing)',
  transform: open ? 'translateX(0)' : 'translateX(100%)',
  width: open ? '100vw' : '0',
}));

const MobileNavMenu = () => {
  const isOpen = useMenuStore(state => state.isOpen);
  const toggleMenu = useMenuStore(state => state.toggleMenu);

  return (
    <>
      <FormLabelStyled open={isOpen} sx={{ zIndex: 2 }}>
        <input type='checkbox' onChange={toggleMenu} />
      </FormLabelStyled>
      <BoxStyled
        open={isOpen}
        sx={{
          zIndex: 1,
        }}
      >
        <ListPages
          onPageChange={toggleMenu}
          sx={{
            item: {
              top: 100,
            },
          }}
        />
      </BoxStyled>
    </>
  );
};

export default MobileNavMenu;
