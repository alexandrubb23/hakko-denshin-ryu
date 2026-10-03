import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import { listResetSx } from "@style/list";
import { padNumber } from "@utils/string";
import { mergeSx } from "@utils/sx";

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
  henkaSx,
  henkaTagSx,
  techniqueKanjiSx,
  techniqueNameSx,
  techniqueNumberSx,
  techniqueSx,
} from "./Syllabus.style";
import {
  type ProgramGroup,
  practiceArt,
  splitName,
  titleCase,
} from "./syllabusData";

interface Props {
  group: ProgramGroup;
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
            // Only the kyu program tells kihon waza from their henka
            const isHenka = technique.isKihon === false;
            return (
              <Box
                component="li"
                key={technique.number}
                sx={mergeSx(techniqueSx, isHenka && henkaSx)}
              >
                <Typography component="span" sx={techniqueNumberSx}>
                  {padNumber(start + i)}
                </Typography>
                <Typography
                  component="span"
                  className="technique-name"
                  sx={techniqueNameSx}
                >
                  {name.romaji}
                  {isHenka && (
                    <Box component="span" sx={henkaTagSx}>
                      Henka
                    </Box>
                  )}
                </Typography>
                <Typography
                  component="span"
                  className="technique-kanji"
                  sx={techniqueKanjiSx}
                  lang="ja"
                >
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
