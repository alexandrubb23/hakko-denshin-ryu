import type { SxProps, Theme } from "@mui/material";

type SxItem = Exclude<SxProps<Theme>, readonly unknown[]>;

/** Merges `sx` values (objects, functions or arrays) with MUI's array syntax */
export const mergeSx = (
  ...sxList: (SxProps<Theme> | false | null | undefined)[]
): SxProps<Theme> =>
  sxList.flatMap((sx) =>
    Array.isArray(sx) ? (sx as readonly SxItem[]) : sx ? [sx as SxItem] : []
  );
