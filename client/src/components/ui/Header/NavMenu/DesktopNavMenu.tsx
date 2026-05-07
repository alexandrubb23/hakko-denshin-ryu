import ListPages from './ListPages';

const DesktopNavMenu = () => (
  <ListPages
    sx={{
      list: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
      },
      item: {
        width: 'fit-content',
        whiteSpace: 'nowrap',
      },
    }}
  />
);

export default DesktopNavMenu;
