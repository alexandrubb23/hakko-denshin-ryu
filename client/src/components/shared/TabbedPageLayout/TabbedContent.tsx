import type { SxProps } from "@mui/material";
import type { ReactNode } from "react";
import {
  ContentCard,
  ContentDivider,
  ContentTitle,
  PageTab,
  PageTabs,
} from "./TabbedPageLayout.style";
import TechniqueGroupsList, {
  type GroupItem,
  type TechniqueBase,
} from "./TechniqueGroupsList";

interface TabBase {
  id: string;
  name: string;
  groups: GroupItem<TechniqueBase>[];
}

/** Extracts the concrete technique type from a tab item via inference. */
type TechniqueOf<TTab> = TTab extends {
  groups: Array<{ techniques: Array<infer T> }>;
}
  ? T
  : never;

interface TabbedContentProps<TTab extends TabBase> {
  items: TTab[];
  activeIndex: number;
  onTabChange: (event: React.SyntheticEvent, value: number) => void;
  renderTabLabel: (item: TTab, idx: number) => ReactNode;
  compactTabs?: boolean;
  renderPanelHeader?: (item: TTab) => ReactNode;
  getTechniqueItemSx?: (technique: TechniqueOf<TTab>) => SxProps;
}

function TabbedContent<TTab extends TabBase>({
  items,
  activeIndex,
  onTabChange,
  renderTabLabel,
  compactTabs,
  renderPanelHeader,
  getTechniqueItemSx,
}: TabbedContentProps<TTab>) {
  const activeItem = items[activeIndex];

  return (
    <>
      <PageTabs
        value={activeIndex}
        onChange={onTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {items.map((item, idx) => (
          <PageTab
            key={item.id}
            value={idx}
            compact={compactTabs}
            label={renderTabLabel(item, idx)}
          />
        ))}
      </PageTabs>

      {activeItem && (
        <ContentCard elevation={0}>
          <ContentTitle variant="h6">{activeItem.name}</ContentTitle>

          {renderPanelHeader?.(activeItem)}

          <ContentDivider />

          <TechniqueGroupsList
            groups={activeItem.groups as GroupItem<TechniqueOf<TTab>>[]}
            getTechniqueSx={getTechniqueItemSx}
          />
        </ContentCard>
      )}
    </>
  );
}

export default TabbedContent;
