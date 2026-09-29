import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useIntl } from "react-intl";

import PageHeader from "@components/shared/PageHeader";

interface StudentsHeaderProps {
  count: number | undefined;
  onAdd: () => void;
}

const StudentsHeader = ({ count, onAdd }: StudentsHeaderProps) => {
  const intl = useIntl();

  return (
    <PageHeader
      icon={<PeopleIcon fontSize="inherit" />}
      title={intl.formatMessage({ id: "admin.students.title" })}
      count={count}
      addIcon={<PersonAddIcon />}
      addLabel={intl.formatMessage({ id: "admin.students.add" })}
      onAdd={onAdd}
    />
  );
};

export default StudentsHeader;
