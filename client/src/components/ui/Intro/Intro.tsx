import { Box, ButtonBase, Typography } from "@mui/material";
import { useIntl } from "react-intl";

import pathSrc from "@assets/images/loader-path.webp";
import { DOJO_KANJI } from "@constants/brand";
import { stripDiacritics } from "@utils/string";

import {
  introArtSx,
  introCaptionSx,
  introKanjiSx,
  introLineSx,
  introNameSx,
  introQuoteSx,
  introQuoteTitleSx,
  introSkipSx,
  introSx,
  introTextSx,
  introTitleSx,
  letterboxSx,
} from "./Intro.style";
import useIntroTimeline, {
  INTRO_LINES,
  type IntroWords,
} from "./useIntroTimeline";

interface Props {
  /** Called when the intro has played out, or been skipped */
  onEnd: () => void;
}

/**
 * The welcome on a session's first visit: the lone practitioner's moonlit
 * path draws into view between cinematic bars, a quote rises mid-screen, then
 * two lines and the dojo's name rise in turn below, then the scene is walked
 * into as the page fades in.
 */
const Intro = ({ onEnd }: Props) => {
  const intl = useIntl();
  // Jarene has no Romanian diacritics
  const line = (id: string) => stripDiacritics(intl.formatMessage({ id }));
  // The words as shown, and as timed: each held long enough to be read
  const textOf = (words: IntroWords) => line(`intro.${words}`);
  const { stage, beat, skipShown, skip } = useIntroTimeline(onEnd, textOf);

  const titleShown = beat === "title";

  return (
    <Box sx={introSx}>
      <Box component="img" src={pathSrc} alt="" sx={introArtSx(stage)} />
      <Box sx={letterboxSx("top", stage)} />
      <Box sx={letterboxSx("bottom", stage)} />

      <Box sx={introQuoteSx} aria-hidden>
        <Typography sx={introQuoteTitleSx(beat === "quote")}>
          {textOf("quote")}
        </Typography>
      </Box>

      <Box sx={introTextSx} aria-hidden>
        {INTRO_LINES.map((id) => (
          <Typography key={id} sx={introLineSx(beat === id)}>
            {textOf(id)}
          </Typography>
        ))}
        <Box sx={introTitleSx(titleShown)}>
          <Typography sx={introKanjiSx}>{DOJO_KANJI}</Typography>
          <Typography sx={introNameSx(titleShown)}>Senshinkan</Typography>
          {/* What the name means */}
          <Typography sx={introCaptionSx}>
            {intl.formatMessage({ id: "page.home.subtitle" })}
          </Typography>
        </Box>
      </Box>

      <ButtonBase
        onClick={skip}
        // Out of the tab order while it can't be seen
        tabIndex={skipShown ? 0 : -1}
        sx={introSkipSx(skipShown)}
      >
        {intl.formatMessage({ id: "intro.skip" })}
      </ButtonBase>
    </Box>
  );
};

export default Intro;
