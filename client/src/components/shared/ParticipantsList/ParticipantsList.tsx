import { Box, Typography } from "@mui/material";

import type { Student } from "@api/students";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

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
        <Typography color="text.secondary">
          <FormattedMessage id="shared.participants.empty" />
        </Typography>
      </Box>
    );
  }

  return (
    <ParticipantsListItems students={students} renderAction={renderAction} />
  );
};

export default ParticipantsList;
