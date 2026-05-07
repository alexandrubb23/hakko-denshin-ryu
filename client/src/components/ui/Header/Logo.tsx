import { Box, Typography } from "@mui/material";
import { Link } from "react-router";

import LogoIcon from "@assets/images/logo.webp";
import useDelayedActive from "@hooks/useDelayedActive";
import useMenuStore from "@store/useMenuStore";

const MENU_ANIMATION_DURATION_MS = 400;

const Logo = () => {
  const isOpen = useMenuStore((state) => state.isOpen);
  const filterActive = useDelayedActive(isOpen, MENU_ANIMATION_DURATION_MS);

  return (
    <Box
      className="logo-box p-4"
      sx={{
        textAlign: "center",
        filter: filterActive ? "blur(var(--backdrop-filter))" : "none",
      }}
    >
      <Link to="/">
        <Box className="flex flex-col justify-center items-center gap-1.5">
          <Box component="img" src={LogoIcon} height={50} />
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem !important",
              padding: 0,
            }}
          >
            Senshinkan
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default Logo;
