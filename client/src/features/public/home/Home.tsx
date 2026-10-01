import { Box } from "@mui/material";
import { useEffect } from "react";

import { ARC_NAV_HIDDEN_SX, ARC_NAV_ONLY_SX } from "@style/arcNavLayout";

import HomeCover from "./HomeCover";
import HomeHero from "./HomeHero";

const Home = () => {
  // Prevent page scroll on the full-screen hero
  useEffect(() => {
    document.documentElement.style.overflowY = "hidden";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, []);

  // Both layouts are rendered and switched in CSS, so the server-rendered
  // markup already matches the screen size (no layout jump on hydration)
  return (
    <>
      <Box sx={ARC_NAV_ONLY_SX}>
        <HomeCover />
      </Box>
      <Box sx={ARC_NAV_HIDDEN_SX}>
        <HomeHero />
      </Box>
    </>
  );
};

export default Home;
