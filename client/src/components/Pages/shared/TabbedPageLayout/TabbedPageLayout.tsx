import { Typography } from "@mui/material";
import type { ReactNode } from "react";
import { ErrorAlert, PageWrapper } from "./TabbedPageLayout.style";

interface TabbedPageLayoutProps {
  title: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  skeleton: ReactNode;
  children?: ReactNode;
}

const TabbedPageLayout = ({
  title,
  isLoading,
  isError,
  errorMessage = "Failed to load data. Please try again.",
  skeleton,
  children,
}: TabbedPageLayoutProps) => (
  <PageWrapper>
    <Typography variant="h5" fontWeight={700}>
      {title}
    </Typography>

    {isLoading && skeleton}

    {isError && <ErrorAlert severity="error">{errorMessage}</ErrorAlert>}

    {children}
  </PageWrapper>
);

export default TabbedPageLayout;
