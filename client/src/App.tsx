import { Stack, styled } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import PageLoader from "@components/ui/PageLoader/PageLoader";
import useBodyOverflow from "@hooks/useBodyOverflow";
import { useApplyColorScheme } from "@hooks/useColorSchemePreference";
import useMounted from "@hooks/useMounted";
import useLangStore from "@store/useLangStore";
import "./App.css";
import Content from "./components/ui/Content/Content";
import Footer from "./components/ui/Footer/Footer";
import Header from "./components/ui/Header/Header";
import { PAGE_TRANSITION_DURATION } from "./constants/animationsTiming";

const StackStyled = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "hydrated",
})<{
  hydrated: boolean;
}>(({ hydrated }) => ({
  display: hydrated ? "flex" : "none",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "space-between",
  gap: 4,
  opacity: 0,
  animation: `fadeIn ${PAGE_TRANSITION_DURATION / 1000}s ease-in-out forwards`,
}));

// TODO: Just for testing heroku deployment, remove later
const App = () => {
  useBodyOverflow();
  // The public pages only: the dashboard stays dark
  useApplyColorScheme();

  const hydrated = useLangStore((state) => state.hydrated);
  // The server renders the loading screen; the page takes over once the
  // client has mounted, so the first client render matches the server's
  const mounted = useMounted();
  const ready = hydrated && mounted;

  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);

  return (
    <>
      <PageLoader loading={!ready} />
      <StackStyled hydrated={ready}>
        <Header />
        <Content />
        <Footer />
      </StackStyled>
    </>
  );
};

export default App;
