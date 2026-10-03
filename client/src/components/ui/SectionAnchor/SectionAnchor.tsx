import CheckIcon from "@mui/icons-material/Check";
import LinkIcon from "@mui/icons-material/Link";
import { IconButton, Tooltip, type SxProps, type Theme } from "@mui/material";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useTimeout } from "usehooks-ts";

import { stripDiacritics } from "@utils/string";
import { mergeSx } from "@utils/sx";

import {
  SECTION_ANCHOR_CLASS,
  copiedSectionAnchorSx,
  sectionAnchorSx,
} from "./SectionAnchor.style";

// How long the checkmark and "Link copied" stay
const COPIED_MS = 2000;

interface Props {
  /** The id of the section the link points to */
  id: string;
  sx?: SxProps<Theme>;
}

/**
 * Copies a link to the section `id`, keeping the page's query string (e.g. the
 * open tab). Hidden until its section heading is hovered: the heading reveals
 * it through `revealSectionAnchorSx`.
 */
const SectionAnchor = ({ id, sx }: Props) => {
  const intl = useIntl();
  const [copied, setCopied] = useState(false);

  useTimeout(() => setCopied(false), copied ? COPIED_MS : null);

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    const url = new URL(window.location.href);
    url.hash = id;
    // The address bar shows the link too, should the clipboard be unavailable
    history.replaceState(history.state, "", url);
    try {
      await navigator.clipboard.writeText(url.href);
      setCopied(true);
    } catch {
      // Insecure context or permission denied: the address bar has the link
    }
  };

  return (
    <Tooltip
      // Rendered in Jarene (the theme's font), which has no diacritic glyphs
      title={stripDiacritics(
        intl.formatMessage({
          id: copied ? "ui.sectionAnchor.copied" : "ui.sectionAnchor.copy",
        })
      )}
      placement="top"
    >
      <IconButton
        component="a"
        href={`#${id}`}
        onClick={handleClick}
        aria-label={intl.formatMessage({ id: "ui.sectionAnchor.copy" })}
        className={SECTION_ANCHOR_CLASS}
        sx={mergeSx(sectionAnchorSx, copied && copiedSectionAnchorSx, sx)}
      >
        {copied ? (
          <CheckIcon fontSize="inherit" />
        ) : (
          <LinkIcon fontSize="inherit" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default SectionAnchor;
