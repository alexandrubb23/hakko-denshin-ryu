import { Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useIntl } from "react-intl";

import CenterSpinner from "@components/ui/Spinner/CenterSpinner";
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
  errorMessage,
  children,
}: TabbedPageLayoutProps) => {
  const intl = useIntl();

  return (
    <PageWrapper>
      <Typography variant="h5" fontWeight={700}>
        {title}
      </Typography>

      {isLoading && <CenterSpinner />}

      {isError && (
        <ErrorAlert>
          {errorMessage ?? intl.formatMessage({ id: "ui.tabbedPage.error" })}
        </ErrorAlert>
      )}

      {children}
    </PageWrapper>
  );
};

export default TabbedPageLayout;
