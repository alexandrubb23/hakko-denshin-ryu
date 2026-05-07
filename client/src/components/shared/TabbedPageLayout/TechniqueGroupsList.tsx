import type { SxProps } from "@mui/material";

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
}

function TechniqueGroupsList<T extends TechniqueBase>({
  groups,
  getTechniqueSx,
}: Props<T>) {
  return (
    <GroupsGrid>
      {groups.map((group) => (
        <GroupCard key={group.id}>
          <GroupTitle variant="subtitle2">{group.name}</GroupTitle>
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
