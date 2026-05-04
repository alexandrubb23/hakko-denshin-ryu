import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { Box, Button } from "@mui/material";

import { BORDER_COLOR, PURPLE, PURPLE_ALPHA_08 } from "@style/tokens";

interface Props {
  onClick: () => void;
}

const NextRankButton = ({ onClick }: Props) => (
  <Box mt={1.5}>
    <Button
      size="small"
      variant="outlined"
      startIcon={<EmojiEventsOutlinedIcon sx={{ fontSize: 15 }} />}
      onClick={onClick}
      sx={{
        borderColor: BORDER_COLOR,
        color: PURPLE,
        fontSize: "0.72rem",
        py: 0.5,
        px: 1.25,
        "&:hover": {
          borderColor: PURPLE,
          backgroundColor: PURPLE_ALPHA_08,
        },
      }}
    >
      Next Rank
    </Button>
  </Box>
);

export default NextRankButton;
