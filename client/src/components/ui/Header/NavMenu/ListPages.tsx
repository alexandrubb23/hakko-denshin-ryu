import useIsMobile from "@hooks/isMobile";
import { List, SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

import LangItem from "./LangItem";
import PageItems from "./PageItems";

interface Props {
  sx?: {
    list?: SxProps<Theme>;
    item?: SxProps<Theme>;
  };
  onPageChange?: () => void;
}

const ListPages = ({ sx, onPageChange }: Props) => {
  const isMobile = useIsMobile();

  return (
    <List sx={sx?.list}>
      {isMobile && <LangItem />}
      <PageItems itemSx={sx?.item} onPageChange={onPageChange} />
      {!isMobile && <LangItem />}
    </List>
  );
};

export default ListPages;
