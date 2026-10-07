import { calendarSessionEnd } from "@hakko/core";
import type { SvgIconComponent } from "@mui/icons-material";
import AppleIcon from "@mui/icons-material/Apple";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import {
  Button,
  ClickAwayListener,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { type KeyboardEvent, useId, useRef, useState } from "react";
import { useIntl } from "react-intl";

import type { Event, EventSession } from "@api/events";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import type { IntlMessageID } from "i18n/messages";

import { type CalendarKey, calendarLinks } from "./calendarLinks";
import {
  calendarButtonSx,
  calendarMenuIconSx,
  calendarMenuSx,
  calendarPopperSx,
} from "./EventDetail.style";

interface Props {
  event: Event;
  /** Just this session; the whole event by default */
  session?: EventSession;
  /** The session cards use the small one */
  size?: "small" | "medium";
}

interface Calendar {
  key: CalendarKey;
  icon: SvgIconComponent;
  label: string;
  hint?: IntlMessageID;
  /** A web calendar, opened in a new tab (the .ics file just downloads) */
  web: boolean;
}

/** The calendars offered, in the menu's order */
const CALENDARS: Calendar[] = [
  { key: "google", icon: GoogleIcon, label: "Google Calendar", web: true },
  {
    key: "ical",
    icon: AppleIcon,
    label: "iCalendar (.ics)",
    hint: "page.event.calendar.ics.hint",
    web: false,
  },
  {
    key: "office365",
    icon: MicrosoftIcon,
    label: "Outlook 365",
    hint: "page.event.calendar.office365.hint",
    web: true,
  },
  {
    key: "live",
    icon: MicrosoftIcon,
    label: "Outlook Live",
    hint: "page.event.calendar.live.hint",
    web: true,
  },
];

const MENU_OFFSET = [{ name: "offset", options: { offset: [0, 8] } }];

/** Whether the event (or session) is still to come, or under way */
const isAhead = (sessions: EventSession[]) =>
  sessions.some(
    (session) => calendarSessionEnd(session).getTime() > Date.now()
  );

/**
 * "Add to calendar", opening a menu of calendars: Google and Outlook open
 * their new-event form, iCalendar downloads the file for any other app.
 * Hidden once the event (or session) is over.
 *
 * A popper rather than a `Menu`: a modal menu locks the page's scroll, and
 * the public layout's scroll lock sends the page back to its top.
 */
const AddToCalendar = ({ event, session, size = "medium" }: Props) => {
  const intl = useIntl();
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  if (!isAhead(session ? [session] : event.sessions)) return null;

  // Back to the button, as a menu would; a click elsewhere keeps its focus
  const close = ({ refocus = true } = {}) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus({ preventScroll: true });
  };

  const handleMenuKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      close({ refocus: false });
    }
  };

  return (
    <>
      <Button
        ref={buttonRef}
        variant={size === "small" ? "text" : "outlined"}
        size={size}
        startIcon={<EventAvailableIcon />}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        sx={calendarButtonSx(size)}
      >
        <FormattedMessage id="page.event.calendar.add" />
      </Button>

      <Popper
        open={open}
        anchorEl={buttonRef.current}
        placement="bottom-start"
        // Clear of the button, above it as below
        modifiers={MENU_OFFSET}
        transition
        sx={calendarPopperSx}
      >
        {({ TransitionProps, placement }) => {
          // Built on opening only: they link back to the page at its own origin
          const links = calendarLinks(event, session, window.location.origin);
          return (
            <Grow
              {...TransitionProps}
              // Grows out of the button, whichever side it opened on
              style={{
                transformOrigin: placement.startsWith("top")
                  ? "left bottom"
                  : "left top",
              }}
            >
              <Paper sx={calendarMenuSx}>
                <ClickAwayListener
                  onClickAway={(e) => {
                    // The button toggles the menu itself
                    if (buttonRef.current?.contains(e.target as Node)) return;
                    close({ refocus: false });
                  }}
                >
                  <MenuList
                    id={menuId}
                    autoFocusItem={open}
                    onKeyDown={handleMenuKeyDown}
                  >
                    {CALENDARS.map(({ key, icon: Icon, label, hint, web }) => (
                      <MenuItem
                        key={key}
                        component="a"
                        href={links[key]}
                        {...(web && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                        onClick={() => close()}
                      >
                        <ListItemIcon sx={calendarMenuIconSx}>
                          <Icon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={label}
                          secondary={hint && intl.formatMessage({ id: hint })}
                        />
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          );
        }}
      </Popper>
    </>
  );
};

export default AddToCalendar;
