import { Box, List, type SxProps, type Theme } from "@mui/material";
import { useId, useMemo, useRef } from "react";

import { MOONLIGHT, PURPLE } from "@style/tokens";
import { mergeSx } from "@utils/sx";

import PageItems from "@components/ui/Header/NavMenu/PageItems";

import {
  type ArcDirection,
  arcItemSx,
  arcListSx,
  arcWrapperSx,
  artFrameSx,
  artImageSx,
  artOverlaySx,
  moonSx,
  rayGlowSx,
  raysSvgSx,
  restingArcSx,
} from "./ArcNavMenu.style";
import type { Painting } from "./moonArt";
import useArcIntro from "./useArcIntro";
import useMoonRays from "./useMoonRays";

interface Props {
  /** Which way the links fan out from the moon; defaults to the right */
  direction?: ArcDirection;
  /**
   * Paintings drawn behind the menu, their moons under the menu's moon,
   * e.g. one per screen size; each shows where its `sx` lets it
   */
  paintings?: readonly Painting[];
  /** Positions and sizes the menu (through its CSS variables) */
  sx?: SxProps<Theme>;
}

const NO_PAINTINGS: readonly Painting[] = [];

/**
 * Hakko (八光) — "eight lights": a moon at the centre of the arc sends
 * one ray to each of the eight menu items.
 */
const ArcNavMenu = ({
  direction = "right",
  paintings = NO_PAINTINGS,
  sx,
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const rays = useMoonRays(wrapperRef, moonRef, listRef);
  const intro = useArcIntro();
  const gradientId = useId();
  // Rays re-render the menu on every resize; the art's styles stay the same
  const paintingsSx = useMemo(
    () =>
      paintings.map(({ art, sx: paintingSx, overlay }) => {
        // The painting's `sx` (e.g. its fade) applies to its overlay too
        const frameSx = mergeSx(artFrameSx(art, direction), paintingSx);
        return {
          art: mergeSx(frameSx, artImageSx(art)),
          overlay: overlay ? mergeSx(frameSx, artOverlaySx) : undefined,
        };
      }),
    [paintings, direction]
  );

  return (
    <Box
      ref={wrapperRef}
      sx={mergeSx(
        arcWrapperSx(rays.length, direction),
        !intro && restingArcSx,
        sx
      )}
    >
      {paintingsSx.map((paintingSx, i) => (
        <Box key={i} sx={paintingSx.art} aria-hidden />
      ))}

      <Box component="svg" sx={raysSvgSx} aria-hidden>
        <defs>
          {rays.map((ray, i) => (
            <linearGradient
              key={i}
              id={`${gradientId}-ray-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
            >
              {/* Moonlight at the moon's edge fading into purple at the link */}
              <stop offset="0%" stopColor={MOONLIGHT} stopOpacity={0.9} />
              <stop offset="100%" stopColor={PURPLE} stopOpacity={0.5} />
            </linearGradient>
          ))}
        </defs>
        {rays.map((ray, i) => (
          <Box
            component="line"
            key={i}
            {...ray}
            pathLength={1}
            stroke={`url(#${gradientId}-ray-${i})`}
            sx={rayGlowSx(i)}
          />
        ))}
      </Box>

      <Box ref={moonRef} sx={moonSx} aria-hidden />

      <List ref={listRef} component="nav" sx={arcListSx[direction]}>
        <PageItems getItemSx={arcItemSx[direction]} />
      </List>

      {paintingsSx.map(
        (paintingSx, i) =>
          paintingSx.overlay && (
            <Box key={i} sx={paintingSx.overlay} aria-hidden>
              {paintings[i].overlay}
            </Box>
          )
      )}
    </Box>
  );
};

export default ArcNavMenu;
