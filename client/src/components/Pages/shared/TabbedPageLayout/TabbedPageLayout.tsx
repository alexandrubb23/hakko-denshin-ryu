import { Typography } from "@mui/material";
import type { ReactNode } from "react";

import CenterSpinner from "@components/Spinner/CenterSpinner";
import ErrorAlert from "../ErrorAlert";
import { PageWrapper } from "./TabbedPageLayout.style";

interface TabbedPageLayoutProps {
  title: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  children?: ReactNode;
}

const TabbedPageLayout = ({
  title,
  isLoading,
  isError,
  errorMessage = "Failed to load data. Please try again.",
  children,
}: TabbedPageLayoutProps) => (
  <PageWrapper>
    <Typography variant="h5" fontWeight={700}>
      {title}
    </Typography>

    {isLoading && <CenterSpinner />}

    {isError && <ErrorAlert>{errorMessage}</ErrorAlert>}

    {children}
  </PageWrapper>
);

export default TabbedPageLayout;
