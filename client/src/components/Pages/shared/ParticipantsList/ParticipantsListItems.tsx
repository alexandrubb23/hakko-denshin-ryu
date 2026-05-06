import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import type { Student } from "@api/students";
import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_25,
  SURFACE_BG,
} from "@style/tokens";
import { getInitials } from "@utils/string";

interface Props {
  students: Student[];
  renderAction: (student: Student) => React.ReactNode;
}

const ParticipantsListItems = ({ students, renderAction }: Props) => (
  <List disablePadding>
    {students.map((student) => (
      <ListItem
        key={student.id}
        divider
        disablePadding
        sx={{
          borderColor: BORDER_COLOR,
          "&:last-child": { borderBottom: 0 },
          "&:hover": { backgroundColor: SURFACE_BG },
          transition: "background-color 0.15s",
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            minWidth: "max-content",
            px: 2,
            py: 1,
            gap: 2,
          }}
        >
          <ListItemAvatar sx={{ minWidth: 44 }}>
            <Avatar
              src={student.image ?? undefined}
              sx={{
                width: 36,
                height: 36,
                backgroundColor: PURPLE_ALPHA_25,
                fontSize: 14,
                fontWeight: 700,
                color: PURPLE,
              }}
            >
              {getInitials(student.name)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ flex: 1, minWidth: 120 }}
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
          <Box sx={{ flexShrink: 0 }}>{renderAction(student)}</Box>
        </Box>
      </ListItem>
    ))}
  </List>
);

export default ParticipantsListItems;
