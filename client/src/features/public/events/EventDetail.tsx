import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import MoonCover from "@components/ui/MoonCover/MoonCover";
import LinkButton from "@components/ui/PageSections/LinkButton";
import { Routes } from "@lib/routes";

import { EVENTS_MOON_ART } from "./eventsArt";

/** One event, opened from its card: under the same lantern-lit stage */
const EventDetail = () => (
  <MoonCover
    art={EVENTS_MOON_ART}
    // 催し — "a gathering"
    kanji="催し"
    eyebrow={<FormattedMessage id="page.event.hero.eyebrow" />}
    title={<FormattedMessage id="page.event.title" />}
    compactTitle
    tagline={<FormattedMessage id="page.event.hero.tagline" />}
    actions={
      <LinkButton to={Routes.events} direction="back">
        <FormattedMessage id="page.event.back" />
      </LinkButton>
    }
  />
);

export default EventDetail;
