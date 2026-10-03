import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type { BodyPositionGroup } from "@api/techniques";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { listResetSx } from "@style/list";
import { padNumber } from "@utils/string";
import { mergeSx } from "@utils/sx";

import { practiceArt, splitName, titleCase } from "./syllabusData";
import {
  categoryArtSx,
  categoryCountSx,
  categoryDetailsSx,
  categoryKanjiSx,
  categoryListSx,
  categoryMetaSx,
  categoryNameSx,
  categoryRangeSx,
  categorySummarySx,
  categorySx,
  categoryThumbSx,
  techniqueKanjiSx,
  techniqueNameSx,
  techniqueNumberSx,
  techniqueSx,
} from "./Syllabus.style";

interface Props {
  group: BodyPositionGroup;
  /** Its first technique's number within the grade */
  start: number;
  expanded: boolean;
  onToggle: () => void;
}

/** One practice category, e.g. Suwari Waza, opening onto its techniques */
const SyllabusCategory = ({ group, start, expanded, onToggle }: Props) => {
  const { romaji, kanji } = splitName(group.name);
  const art = practiceArt(group.id);
  const count = group.techniques.length;
  const end = start + count - 1;

  return (
    <Accordion
      expanded={expanded}
      onChange={onToggle}
      disableGutters
      elevation={0}
      square
      sx={categorySx}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={`${group.id}-header`}
        aria-controls={`${group.id}-content`}
        sx={categorySummarySx}
      >
        {art && (
          // Illustrates the name beside it
          <Box
            component="img"
            className="category-thumb"
            src={art}
            alt=""
            loading="lazy"
            sx={categoryThumbSx}
          />
        )}
        <Box>
          <Typography component="h4" sx={categoryNameSx}>
            {titleCase(romaji)}
          </Typography>
          {kanji && (
            <Typography sx={categoryKanjiSx} lang="ja">
              {kanji}
            </Typography>
          )}
        </Box>
        <Box sx={categoryMetaSx}>
          <Typography sx={categoryRangeSx} aria-hidden>
            {padNumber(start)} — {padNumber(end)}
          </Typography>
          <Typography sx={categoryCountSx}>
            <FormattedMessage
              id="page.hakko-ryu.syllabus.count"
              values={{ count }}
            />
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={categoryDetailsSx}>
        {art && <Box sx={categoryArtSx(art)} aria-hidden />}
        <Box
          component="ol"
          start={start}
          sx={mergeSx(listResetSx, categoryListSx)}
        >
          {group.techniques.map((technique, i) => {
            const name = splitName(technique.name);
            return (
              <Box component="li" key={technique.number} sx={techniqueSx}>
                <Typography component="span" sx={techniqueNumberSx}>
                  {padNumber(start + i)}
                </Typography>
                <Typography component="span" sx={techniqueNameSx}>
                  {name.romaji}
                </Typography>
                <Typography component="span" sx={techniqueKanjiSx} lang="ja">
                  {name.kanji}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SyllabusCategory;
