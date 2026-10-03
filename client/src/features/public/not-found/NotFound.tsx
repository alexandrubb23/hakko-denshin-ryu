import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import MoonCover from "@components/ui/MoonCover/MoonCover";
import LinkButton from "@components/ui/PageSections/LinkButton";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { Routes } from "@lib/routes";
import { useResponseStatus } from "@providers/ServerResponse";

import { NOT_FOUND_PAGE } from "../../../pages";
import { LANTERN_PATH_FADE, LANTERN_PATH_MOON_ART } from "./notFoundArt";

/** Any address no page answers to: the lanterns light the way back */
const NotFound = () => {
  useResponseStatus(404);
  useDocumentTitle(NOT_FOUND_PAGE);

  return (
    <MoonCover
      art={LANTERN_PATH_MOON_ART}
      // 迷い道 — "a lost path"
      kanji="迷い道"
      eyebrow={<FormattedMessage id="page.not-found.hero.eyebrow" />}
      title={<FormattedMessage id="page.not-found.title" />}
      compactTitle
      tagline={<FormattedMessage id="page.not-found.hero.tagline" />}
      wideArtFade={LANTERN_PATH_FADE}
      actions={
        <LinkButton to={Routes.home}>
          <FormattedMessage id="page.not-found.button" />
        </LinkButton>
      }
    />
  );
};

export default NotFound;
