import { Typography, TypographyProps } from "@mui/material";

import { mergeSx } from "@utils/sx";

type PageTitleProps = Omit<TypographyProps, "variant" | "fontWeight">;

const PageTitle = ({ children, sx, ...props }: PageTitleProps) => (
  <Typography variant="h4" {...props} sx={mergeSx({ fontWeight: 700 }, sx)}>
    {children}
  </Typography>
);

export default PageTitle;
