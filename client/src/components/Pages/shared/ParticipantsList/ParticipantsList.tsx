import { Box, Typography } from "@mui/material";

import type { Student } from "@api/students";
import ParticipantsListItems from "./ParticipantsListItems";
import ParticipantsListSkeleton from "./ParticipantsListSkeleton";

interface Props {
  students: Student[] | undefined;
  isLoading: boolean;
  renderAction: (student: Student) => React.ReactNode;
}

const ParticipantsList = ({ students, isLoading, renderAction }: Props) => {
  if (isLoading) return <ParticipantsListSkeleton />;

  if (!students?.length) {
    return (
      <Box p={4} textAlign="center">
        <Typography color="text.secondary">No students found.</Typography>
      </Box>
    );
  }

  return (
    <ParticipantsListItems students={students} renderAction={renderAction} />
  );
};

export default ParticipantsList;
