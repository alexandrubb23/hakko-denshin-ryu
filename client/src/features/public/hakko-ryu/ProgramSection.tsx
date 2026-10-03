import { useIntl } from "react-intl";

import { Skeleton, Typography } from "@mui/material";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import useUrlTab from "@hooks/useUrlTab";
import { SKELETON_SX } from "@style/colorScheme";

import type { IntlMessageID } from "i18n/messages";

import ProgramPanel, { type ProgramPanelProps } from "./ProgramPanel";
import ProgramTabs, { type ProgramTab } from "./ProgramTabs";
import { programErrorSx } from "./Syllabus.style";

interface Props<T extends { id: string }> {
  /** The fetched items, one tab each */
  query: { data?: T[]; isLoading: boolean; isError: boolean };
  /** The URL query parameter holding the active tab's id */
  paramKey: string;
  errorId: IntlMessageID;
  tabsLabelId: IntlMessageID;
  toTab: (item: T) => Omit<ProgramTab, "id">;
  toPanel: (item: T) => Omit<ProgramPanelProps, "id">;
}

/** A program's tabs over its panels, the active one kept in the URL */
const ProgramSection = <T extends { id: string }>({
  query: { data: items, isLoading, isError },
  paramKey,
  errorId,
  tabsLabelId,
  toTab,
  toPanel,
}: Props<T>) => {
  const intl = useIntl();
  const { activeTabIndex, selectTab } = useUrlTab(items, paramKey);

  if (isError) {
    return (
      <Typography sx={programErrorSx}>
        <FormattedMessage id={errorId} />
      </Typography>
    );
  }

  if (isLoading) {
    return <Skeleton variant="rounded" height={420} sx={SKELETON_SX} />;
  }

  if (!items?.length) return null;

  const active = items[activeTabIndex] ?? items[0];

  return (
    <>
      <ProgramTabs
        tabs={items.map((item) => ({ id: item.id, ...toTab(item) }))}
        activeIndex={activeTabIndex}
        onChange={selectTab}
        ariaLabel={intl.formatMessage({ id: tabsLabelId })}
      />

      {/* Keyed so each tab opens with its first category */}
      <ProgramPanel key={active.id} id={active.id} {...toPanel(active)} />
    </>
  );
};

export default ProgramSection;
