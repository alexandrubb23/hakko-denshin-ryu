import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import TransitionLink from "@components/ui/TransitionLink/TransitionLink";
import useNavItems from "@hooks/useNavItems";
import { SxProps, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { PURPLE } from "@style/colorScheme";
import { mergeSx } from "@utils/sx";

import { ListItemStyle } from "./ListPages.style";

const ACTIVE_ITEM_SX = {
  border: `1px solid ${PURPLE}`,
  borderRadius: "20px",
  padding: "2px 15px",
};

interface Props {
  itemSx?: SxProps<Theme>;
  /** Per-item styles, e.g. to lay items out along a curve */
  getItemSx?: (index: number, count: number) => SxProps<Theme>;
  onPageChange?: () => void;
}

const PageItems = ({ itemSx, getItemSx, onPageChange }: Props) => {
  const items = useNavItems();

  return items.map(({ path, to, messageId, isActive }, index) => (
    <ListItemStyle
      key={path}
      sx={mergeSx(itemSx, getItemSx?.(index, items.length))}
    >
      <Typography
        variant="body1"
        sx={{ textAlign: "center", ...(isActive && ACTIVE_ITEM_SX) }}
      >
        <TransitionLink
          to={to}
          aria-current={isActive ? "page" : undefined}
          onClick={onPageChange}
        >
          <FormattedMessage id={messageId} />
        </TransitionLink>
      </Typography>
    </ListItemStyle>
  ));
};

export default PageItems;
