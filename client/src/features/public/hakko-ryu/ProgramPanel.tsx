import { useState } from "react";

import { Box, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

import { RankOrdinal, type Grade, type Rank } from "./GradeRank";
import {
  gradeBeltSx,
  gradeHeaderSx,
  gradeHeadingSx,
  gradeMetaKanjiSx,
  gradeMetaSx,
  gradeTitleSx,
} from "./Syllabus.style";
import SyllabusCategory from "./SyllabusCategory";
import { numberGroups, type ProgramGroup } from "./syllabusData";

export interface ProgramPanelProps {
  /** The tab's id: the panel is `${id}-panel` */
  id: string;
  title: React.ReactNode;
  rank?: Rank;
  grade: Grade;
  groups: ProgramGroup[];
  /** A round belt beside the title */
  belt?: string;
  /** Between the header and the categories, e.g. a legend */
  children?: React.ReactNode;
}

/** One grade's categories, its techniques numbered through the whole grade */
const ProgramPanel = ({
  id,
  title,
  rank,
  grade,
  groups,
  belt,
  children,
}: ProgramPanelProps) => {
  // The first category starts open
  const [open, setOpen] = useState(
    () => new Set(groups.slice(0, 1).map((group) => group.id))
  );

  const toggle = (groupId: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(groupId)) next.add(groupId);
      return next;
    });

  const { starts, total } = numberGroups(groups);

  return (
    <Box role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab`}>
      <Box sx={gradeHeaderSx}>
        <Box sx={gradeHeadingSx}>
          {belt && (
            // Illustrates the title beside it
            <Box component="img" src={belt} alt="" sx={gradeBeltSx} />
          )}
          <Typography component="h3" sx={gradeTitleSx}>
            {title}
          </Typography>
        </Box>
        <Typography sx={gradeMetaSx}>
          {rank && (
            <>
              <Box component="span" sx={gradeMetaKanjiSx} lang="ja">
                {rank.kanji}
              </Box>
              {" · "}
              <RankOrdinal grade={grade} n={rank.n} />
              {" · "}
            </>
          )}
          <FormattedMessage
            id="page.hakko-ryu.syllabus.count"
            values={{ count: total }}
          />
        </Typography>
      </Box>

      {children}

      {groups.map((group, i) => (
        <SyllabusCategory
          key={group.id}
          group={group}
          start={starts[i]}
          expanded={open.has(group.id)}
          onToggle={() => toggle(group.id)}
        />
      ))}
    </Box>
  );
};

export default ProgramPanel;
