import { Box, Tab, Tabs } from "@mui/material";

import {
  programTabBeltSx,
  programTabKanjiSx,
  programTabsSx,
} from "./Syllabus.style";

export interface ProgramTab {
  id: string;
  /** Above the label, e.g. 初段 */
  kanji?: string;
  /** A small round belt beside the kanji */
  belt?: string;
  label: React.ReactNode;
}

interface Props {
  tabs: ProgramTab[];
  activeIndex: number;
  onChange: (index: number) => void;
  ariaLabel: string;
}

/** Hairline tabs over a program's panels; each panel is `${id}-panel` */
const ProgramTabs = ({ tabs, activeIndex, onChange, ariaLabel }: Props) => (
  <Tabs
    value={activeIndex}
    onChange={(_, index: number) => onChange(index)}
    aria-label={ariaLabel}
    variant="scrollable"
    scrollButtons={false}
    sx={programTabsSx}
  >
    {tabs.map(({ id, kanji, belt, label }) => (
      <Tab
        key={id}
        id={`${id}-tab`}
        aria-controls={`${id}-panel`}
        label={
          <>
            {kanji && (
              <Box component="span" sx={programTabKanjiSx} lang="ja">
                {belt && (
                  // The tab's label names the belt
                  <Box
                    component="img"
                    src={belt}
                    alt=""
                    sx={programTabBeltSx}
                  />
                )}
                {kanji}
              </Box>
            )}
            {label}
          </>
        }
      />
    ))}
  </Tabs>
);

export default ProgramTabs;
