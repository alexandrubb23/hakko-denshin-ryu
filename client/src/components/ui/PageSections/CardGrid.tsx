import { Children } from "react";

import { Grid, type GridProps } from "@mui/material";

import FadeIn from "@components/ui/FadeIn/FadeIn";

import { cardGridSx } from "./PageSections.style";

interface Props {
  /** Each card's column size */
  size: GridProps["size"];
  /** Seconds between one card fading in and the next */
  stagger: number;
  children: React.ReactNode;
}

/** Equal-height cards that fade in one after another */
const CardGrid = ({ size, stagger, children }: Props) => (
  <Grid container spacing={3} sx={cardGridSx}>
    {Children.map(children, (card, i) => (
      <Grid size={size}>
        <FadeIn delay={i * stagger} fullHeight>
          {card}
        </FadeIn>
      </Grid>
    ))}
  </Grid>
);

export default CardGrid;
