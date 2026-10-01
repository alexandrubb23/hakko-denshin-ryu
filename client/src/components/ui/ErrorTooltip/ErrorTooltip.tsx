import { Tooltip, type TooltipProps } from "@mui/material";
import { useMemo } from "react";

import { errorArrowSx, errorTooltipSx } from "./ErrorTooltip.style";

type Placement = TooltipProps["placement"];

const DEFAULT_FALLBACKS: Placement[] = ["top", "bottom"];

interface Props {
  /** Shown while set; the tooltip is open exactly when there's an error */
  message?: string | null;
  /** Links the message to its control, e.g. via `aria-describedby` */
  id: string;
  /** Where to float without room on the left, e.g. on narrow screens */
  fallbackPlacements?: Placement[];
  children: TooltipProps["children"];
}

/**
 * A form error floating beside its control. It opens on its own (not on
 * hover) and is announced to screen readers as it appears.
 */
const ErrorTooltip = ({
  message,
  id,
  fallbackPlacements = DEFAULT_FALLBACKS,
  children,
}: Props) => {
  // A new array would make the popper rebuild on every render while open
  const modifiers = useMemo(
    () => [{ name: "flip", options: { fallbackPlacements } }],
    [fallbackPlacements]
  );

  return (
    <Tooltip
      open={!!message}
      title={
        message ? (
          <span id={id} role="alert">
            {message}
          </span>
        ) : (
          ""
        )
      }
      placement="left"
      arrow
      disableHoverListener
      disableFocusListener
      disableTouchListener
      slotProps={{
        tooltip: { sx: errorTooltipSx },
        arrow: { sx: errorArrowSx },
        popper: { modifiers },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default ErrorTooltip;
