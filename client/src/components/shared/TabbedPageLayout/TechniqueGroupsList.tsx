import type { SxProps } from "@mui/material";

import SectionAnchor from "@components/ui/SectionAnchor/SectionAnchor";
import { revealSectionAnchorSx } from "@components/ui/SectionAnchor/SectionAnchor.style";

import {
  GroupCard,
  GroupsGrid,
  GroupTitle,
  TechniqueItem,
  TechniqueList,
} from "./TabbedPageLayout.style";

export interface TechniqueBase {
  number: number;
  name: string;
}

export interface GroupItem<T extends TechniqueBase> {
  id: string;
  name: string;
  techniques: T[];
}

interface Props<T extends TechniqueBase> {
  groups: GroupItem<T>[];
  getTechniqueSx?: (technique: T) => SxProps | undefined;
  /** Give each group a copy-link anchor, its id as the URL fragment */
  anchored?: boolean;
}

function TechniqueGroupsList<T extends TechniqueBase>({
  groups,
  getTechniqueSx,
  anchored = false,
}: Props<T>) {
  return (
    <GroupsGrid>
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          id={anchored ? group.id : undefined}
          sx={anchored ? revealSectionAnchorSx : undefined}
        >
          <GroupTitle variant="subtitle2">
            {group.name}
            {anchored && <SectionAnchor id={group.id} />}
          </GroupTitle>
          <TechniqueList component="ol">
            {group.techniques.map((technique) => (
              <TechniqueItem
                component="li"
                key={`${group.id}-${technique.number}`}
                sx={getTechniqueSx?.(technique)}
              >
                {technique.name}
              </TechniqueItem>
            ))}
          </TechniqueList>
        </GroupCard>
      ))}
    </GroupsGrid>
  );
}

export default TechniqueGroupsList;
