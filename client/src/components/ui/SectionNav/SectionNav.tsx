import CloseIcon from "@mui/icons-material/Close";
import TocIcon from "@mui/icons-material/Toc";
import { Box, ClickAwayListener, IconButton, Typography } from "@mui/material";
import { useId, useMemo } from "react";
import { useIntl } from "react-intl";

import usePeekingDisclosure from "@hooks/usePeekingDisclosure";

import {
  sectionNavLabelSx,
  sectionNavListSx,
  sectionNavPanelSx,
  sectionNavSx,
  sectionNavTriggerSx,
} from "./SectionNav.style";
import {
  SECTION_NAV_MIN_SECTIONS,
  type SectionNavSection,
  sectionNavRows,
} from "./sections";
import TocList from "./TocList";

interface Props {
  /** The page's chapters, in page order */
  sections: readonly SectionNavSection[];
}

/**
 * The floating "On this page" of the long pages: a table of contents whose
 * line follows the chapters in view and whose dot travels it while
 * scrolling. Rendered only for pages of more than three chapters.
 *
 * Wide screens have room beside the page's measure: there the panel itself
 * shows. Elsewhere a round trigger on the right edge opens it over the page,
 * and following a row closes it again, since the panel would cover the
 * chapter it scrolled to. Like the cover controls' tray, either stays out of
 * sight until the page scrolls, and slides back once it is still (the panel
 * not while hovered or focused). The switch is a media query rather than a
 * hook, so the server renders it right and nothing flickers after hydration.
 */
const SectionNav = ({ sections }: Props) =>
  sections.length < SECTION_NAV_MIN_SECTIONS ? null : (
    <FloatingToc sections={sections} />
  );

const FloatingToc = ({ sections }: Props) => {
  const intl = useIntl();
  const panelId = useId();
  const { triggerRef, open, peeking, peek, close, dismiss, toggle } =
    usePeekingDisclosure();

  // The list re-observes every target when the array changes identity
  const rows = useMemo(
    () => sectionNavRows(sections, (id) => intl.formatMessage({ id })),
    [sections, intl]
  );

  const label = intl.formatMessage({ id: "ui.sectionNav.label" });

  return (
    // A tap outside closes the panel, which covers the page on narrow screens
    <ClickAwayListener onClickAway={dismiss}>
      <Box sx={sectionNavSx}>
        <Box
          component="nav"
          id={panelId}
          aria-label={label}
          // Lingers a moment once the pointer leaves, like after a scroll
          onMouseLeave={peek}
          sx={sectionNavPanelSx(open, peeking)}
        >
          <Typography sx={sectionNavLabelSx}>{label}</Typography>

          <Box sx={sectionNavListSx}>
            <TocList rows={rows} onNavigate={close} />
          </Box>
        </Box>

        <IconButton
          ref={triggerRef}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={intl.formatMessage({
            id: open ? "ui.sectionNav.close" : "ui.sectionNav.open",
          })}
          onClick={toggle}
          sx={sectionNavTriggerSx(open || peeking)}
        >
          {open ? <CloseIcon /> : <TocIcon />}
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
};

export default SectionNav;
