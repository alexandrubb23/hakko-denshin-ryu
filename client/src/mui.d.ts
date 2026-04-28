// mui.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h2Inter: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h2Inter?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h2Inter: true;
  }
}
