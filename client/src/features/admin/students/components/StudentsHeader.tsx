import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import PageHeader from "@components/shared/PageHeader";

interface StudentsHeaderProps {
  count: number | undefined;
  onAdd: () => void;
}

const StudentsHeader = ({ count, onAdd }: StudentsHeaderProps) => (
  <PageHeader
    icon={<PeopleIcon fontSize="inherit" />}
    title="Students"
    count={count}
    addIcon={<PersonAddIcon />}
    addLabel="Add Student"
    onAdd={onAdd}
  />
);

export default StudentsHeader;
