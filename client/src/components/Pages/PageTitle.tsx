import { Typography, TypographyProps } from "@mui/material";

type PageTitleProps = Omit<TypographyProps, "variant" | "fontWeight">;

const PageTitle = ({ children, ...props }: PageTitleProps) => (
  <Typography variant="h4" fontWeight={700} {...props}>
    {children}
  </Typography>
);

export default PageTitle;
