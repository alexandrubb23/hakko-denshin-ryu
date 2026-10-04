import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  GlobalStyles,
} from "@mui/material";
import { useId, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useDebounceCallback, useEventListener } from "usehooks-ts";

import { NIGHT } from "@style/colorScheme";

import {
  TRAY_CLEARANCE,
  trayChevronSx,
  trayControlsSx,
  trayHandleSx,
  traySx,
  type TrayState,
} from "./CoverControls.style";
import CoverControlsSet from "./CoverControlsSet";

// How long the handle lingers once the page stops scrolling
const PEEK_DURATION = 3000;

const PASSIVE = { passive: true };

/**
 * The cover controls on phones, hidden until the page scrolls: then an arrow
 * handle peeks out of the right edge, and slides back a while after the
 * scrolling stops. The handle slides the controls out; a tap outside or Escape
 * slides them back. They stay out while used, so a scheme or language change can
 * be seen and undone.
 */
const CoverControlsTray = () => {
  const intl = useIntl();
  const controlsId = useId();
  const handleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [peeking, setPeeking] = useState(false);
  const settlePeek = useDebounceCallback(setPeeking, PEEK_DURATION);

  // Show the handle, and hide it once the page has been still for a while
  const peek = () => {
    setPeeking(true);
    settlePeek(false);
  };

  useEventListener("scroll", peek, undefined, PASSIVE);

  const close = () => {
    setOpen(false);
    // Leave the handle up a moment, rather than whisking it away
    peek();
  };

  useEventListener("keydown", (event) => {
    if (!open || event.key !== "Escape") return;
    close();
    handleRef.current?.focus();
  });

  const state: TrayState = open ? "open" : peeking ? "peeking" : "hidden";

  return (
    <>
      {/* The footer (the page's scrolling foot) keeps room for the open tray,
          so its last row stays reachable */}
      <GlobalStyles
        styles={{
          "#footer": { paddingBottom: `calc(32px + ${TRAY_CLEARANCE})` },
        }}
      />
      <ClickAwayListener onClickAway={() => open && close()}>
        <Box sx={traySx(state)} {...NIGHT}>
          <ButtonBase
            ref={handleRef}
            aria-expanded={open}
            aria-controls={controlsId}
            aria-label={intl.formatMessage({
              id: open ? "ui.coverControls.hide" : "ui.coverControls.show",
            })}
            onClick={() => (open ? close() : setOpen(true))}
            sx={trayHandleSx}
          >
            <ChevronLeftIcon sx={trayChevronSx(open)} />
          </ButtonBase>

          {/* Off screen while closed: out of the tab order and screen readers */}
          <Box id={controlsId} sx={trayControlsSx} inert={!open}>
            <CoverControlsSet />
          </Box>
        </Box>
      </ClickAwayListener>
    </>
  );
};

export default CoverControlsTray;
