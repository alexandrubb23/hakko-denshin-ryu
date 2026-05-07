import { List, Typography } from "@mui/material";

import type { Student } from "@api/students";
import { getInitials } from "@utils/string";

import {
  ActionBox,
  ItemRow,
  StudentAvatar,
  StyledListItem,
  StyledListItemAvatar,
  StyledListItemText,
} from "./ParticipantsListItems.style";

interface Props {
  students: Student[];
  renderAction: (student: Student) => React.ReactNode;
}

const ParticipantsListItems = ({ students, renderAction }: Props) => (
  <List disablePadding>
    {students.map((student) => (
      <StyledListItem key={student.id} divider disablePadding>
        <ItemRow>
          <StyledListItemAvatar>
            <StudentAvatar src={student.image ?? undefined}>
              {getInitials(student.name)}
            </StudentAvatar>
          </StyledListItemAvatar>
          <StyledListItemText
            primary={
              <Typography variant="body2" fontWeight={600}>
                {student.name}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color="text.secondary">
                {student.email}
              </Typography>
            }
          />
          <ActionBox>{renderAction(student)}</ActionBox>
        </ItemRow>
      </StyledListItem>
    ))}
  </List>
);

export default ParticipantsListItems;
