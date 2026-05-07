import { styled } from "@mui/material";
import { Outlet } from "react-router";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "withTopOffset",
})<{ withTopOffset?: boolean }>(({ theme, withTopOffset }) => ({
  flexGrow: 1,
  minWidth: 0,
  padding: theme.spacing(1.5),
  ...(withTopOffset && { marginTop: theme.spacing(8) }),
}));

interface Props {
  withTopOffset?: boolean;
}

const DashboardMain = ({ withTopOffset }: Props) => (
  <Main withTopOffset={withTopOffset}>
    <Outlet />
  </Main>
);

export default DashboardMain;
