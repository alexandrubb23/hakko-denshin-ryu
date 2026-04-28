import FormattedMessage from '@components/FormattedMessage/FormattedMessage';
import LanguageSwitcher from '@components/LanguageSwitcher/LanguageSwitcher';
import { List, ListItem, SxProps, Typography } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { normalizePath } from '@utils/routes';
import { Link, useLocation } from 'react-router';
import { pages } from '../../../pages';
import useIsMobile from '@hooks/isMobile';

interface Props {
  sx?: {
    list?: SxProps<Theme>;
    item?: SxProps<Theme>;
  };
  onPageChange?: () => void;
}

const ListItemStyle = styled(ListItem)(({ sx }) => ({
  cursor: 'pointer',
  display: 'block',
  fontSize: '2rem',
  textAlign: 'center',
  transition: '200ms ease-in-out',
  '&:hover': {
    color: '#AB96FF',
    cursor: 'pointer',
    transform: 'scale(1.1)',
  },

  ...(sx as Object),
}));

const ListPages = ({ sx, onPageChange }: Props) => {
  const isMobile = useIsMobile();
  const location = useLocation();

  const langItem = (
    <ListItemStyle
      key="language-switcher"
      sx={{
        paddingTop: 0,
      }}
    >
      <LanguageSwitcher />
    </ListItemStyle>
  );

  const pageItems = pages.map(page => {
    const cssProps =
      location.pathname === normalizePath(page.path)
        ? {
            border: '1px solid #AB96FF',
            borderRadius: '20px',
            padding: '2px 15px',
          }
        : {};

    return (
      <ListItemStyle key={page.path} sx={sx?.item}>
        <Typography
          variant='body1'
          sx={{
            textAlign: 'center',
            ...cssProps,
          }}
        >
          <Link to={normalizePath(page.path)} onClick={onPageChange}>
            <FormattedMessage id={`header.menu.${page.path}`} />
          </Link>
        </Typography>
      </ListItemStyle>
    );
  });

  const listContent = isMobile
    ? [langItem, ...pageItems]
    : [...pageItems, langItem];

  return <List sx={sx?.list}>{listContent}</List>;
};

export default ListPages;
