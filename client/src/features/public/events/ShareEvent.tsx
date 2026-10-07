import type { SvgIconComponent } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkIcon from "@mui/icons-material/Link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";

import type { Event } from "@api/events";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import useTransientState from "@hooks/useTransientState";
import { copyToClipboard } from "@utils/clipboard";
import type { IntlMessageID } from "i18n/messages";

import {
  factLabelSx,
  shareButtonSx,
  shareNoticeSx,
  shareRowSx,
  shareSx,
} from "./EventDetail.style";
import { eventPageUrl, eventShareText } from "./eventMeta";
import { facebookShareUrl, whatsappShareUrl } from "./shareLinks";

// How long "Link copied" stays up
const NOTICE_MS = 4000;

interface ShareButtonProps {
  icon: SvgIconComponent;
  label: string;
  /** A link to open in a new tab… */
  href?: string;
  /** …or something to do here */
  onClick?: () => void;
}

/** A round icon, like the footer's social links */
const ShareButton = ({
  icon: Icon,
  label,
  href,
  onClick,
}: ShareButtonProps) => (
  <Box
    component={href ? "a" : "button"}
    {...(href
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : { type: "button", onClick })}
    aria-label={label}
    title={label}
    sx={shareButtonSx}
  >
    <Icon fontSize="small" />
  </Box>
);

/**
 * Sharing the event: Facebook's share dialog, WhatsApp, a copy of the link,
 * and Instagram. Instagram takes no shared links from the web, so it opens
 * the device's share sheet where there is one (phones), and otherwise copies
 * the link to paste into a story, post or message.
 */
const ShareEvent = ({ event }: { event: Event }) => {
  const intl = useIntl();
  const [notice, showNotice] = useTransientState<IntlMessageID>(NOTICE_MS);

  // Only rendered in the browser, once the event has loaded
  const pageUrl = eventPageUrl(window.location.origin, event.slug);
  const text = eventShareText(intl.locale, event);
  const label = (id: IntlMessageID) => intl.formatMessage({ id });

  const copyLink = async (copied: IntlMessageID) =>
    showNotice(
      (await copyToClipboard(pageUrl)) ? copied : "page.event.share.failed"
    );

  // The device's share sheet, where Instagram is one of the apps; else a copy
  const shareOrCopy = async () => {
    if (!navigator.share) {
      await copyLink("page.event.share.instagram.copied");
      return;
    }
    try {
      await navigator.share({ title: event.name, text, url: pageUrl });
    } catch {
      // Dismissed: nothing to say
    }
  };

  return (
    <Box sx={shareSx}>
      <Typography sx={factLabelSx}>
        <FormattedMessage id="page.event.share.title" />
      </Typography>
      <Box sx={shareRowSx}>
        <ShareButton
          icon={FacebookIcon}
          label={label("page.event.share.facebook")}
          href={facebookShareUrl(pageUrl)}
        />
        <ShareButton
          icon={InstagramIcon}
          label={label("page.event.share.instagram")}
          onClick={shareOrCopy}
        />
        <ShareButton
          icon={WhatsAppIcon}
          label={label("page.event.share.whatsapp")}
          href={whatsappShareUrl(text, pageUrl)}
        />
        <ShareButton
          icon={LinkIcon}
          label={label("page.event.share.copy")}
          onClick={() => copyLink("page.event.share.copied")}
        />
      </Box>
      <Typography sx={shareNoticeSx} role="status" aria-live="polite">
        {notice && <FormattedMessage id={notice} />}
      </Typography>
    </Box>
  );
};

export default ShareEvent;
