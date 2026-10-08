import { Box, ButtonBase, Typography } from "@mui/material";
import { useIntl } from "react-intl";

import walkSrc from "@assets/images/intro-walk.webp";
import plateSrc from "@assets/images/loader-path-empty.webp";
import { DOJO_KANJI } from "@constants/brand";
import { stripDiacritics } from "@utils/string";

import {
  introArtSx,
  introCaptionSx,
  introKanjiSx,
  introLineSx,
  introNameSx,
  introPlateSx,
  introSkipSx,
  introSx,
  introTextSx,
  introTitleSx,
  introWalkSheetSx,
  introWalkStopSx,
  letterboxSx,
} from "./Intro.style";
import useIntroTimeline, {
  INTRO_BEATS,
  INTRO_WORDS,
  type IntroWords,
  WRAPPING_WORDS,
} from "./useIntroTimeline";
import { WALK_STOPS } from "./walkSheet";

interface Props {
  /** Called when the intro has played out, or been skipped */
  onEnd: () => void;
}

/**
 * The welcome on a session's first visit: the lone practitioner's moonlit
 * path draws into view between cinematic bars; a quote, two lines and the
 * dojo's name rise in turn at the bottom, the practitioner seen further up the
 * path with each, then the scene is walked into as the page fades in.
 */
const Intro = ({ onEnd }: Props) => {
  const intl = useIntl();
  // Jarene has no Romanian diacritics
  const line = (id: string) => stripDiacritics(intl.formatMessage({ id }));
  // The words as shown, and as timed: each held long enough to be read
  const textOf = (words: IntroWords) => line(`intro.${words}`);
  const { stage, beat, reached, skipShown, skip } = useIntroTimeline(
    onEnd,
    textOf
  );
  // He stands at the first stop from the start through the quote, then is
  // seen at each next stop with its words, the last held with the name
  const atStop = (i: number) =>
    i === 0
      ? reached === "none" || reached === INTRO_BEATS[0]
      : beat === INTRO_BEATS[i];

  const titleShown = beat === "title";

  return (
    <Box sx={introSx}>
      <Box sx={introArtSx(stage)}>
        <Box
          component="img"
          src={plateSrc}
          alt=""
          fetchPriority="high"
          sx={introPlateSx}
        />
        {WALK_STOPS.map((stop, i) => (
          <Box key={i} sx={introWalkStopSx(stop, atStop(i))}>
            <Box
              component="img"
              src={walkSrc}
              alt=""
              sx={introWalkSheetSx(i)}
            />
          </Box>
        ))}
      </Box>
      <Box sx={letterboxSx("top", stage)} />
      <Box sx={letterboxSx("bottom", stage)} />

      <Box sx={introTextSx} aria-hidden>
        {INTRO_WORDS.map((words) => (
          <Typography
            key={words}
            sx={introLineSx(beat === words, words === WRAPPING_WORDS)}
          >
            {textOf(words)}
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
