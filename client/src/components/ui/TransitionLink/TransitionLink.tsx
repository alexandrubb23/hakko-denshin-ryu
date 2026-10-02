import { useViewTransitionNavigate } from "@hooks/useViewTransitionNavigate";
import type { MouseEvent } from "react";
import { Link, type LinkProps, useLocation } from "react-router";

interface Props extends Omit<LinkProps, "to"> {
  to: string;
}

// Clicks the browser handles itself: new tab / window, download, other buttons
const isModifiedClick = (event: MouseEvent<HTMLAnchorElement>) =>
  event.button !== 0 ||
  event.metaKey ||
  event.ctrlKey ||
  event.shiftKey ||
  event.altKey;

/**
 * Link that navigates inside a view transition (see useViewTransitionNavigate).
 * New-tab clicks, links to the current page and handlers that prevent the
 * default are left to the plain link.
 */
const TransitionLink = ({ to, onClick, target, ...rest }: Props) => {
  const { pathname } = useLocation();
  const navigateWithTransition = useViewTransitionNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      isModifiedClick(event) ||
      (target && target !== "_self") ||
      to === pathname
    )
      return;

    event.preventDefault();
    navigateWithTransition(to);
  };

  return <Link to={to} target={target} onClick={handleClick} {...rest} />;
};

export default TransitionLink;
