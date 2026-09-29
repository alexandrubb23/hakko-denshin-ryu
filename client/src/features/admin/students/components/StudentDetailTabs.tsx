import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";
import { useIntl } from "react-intl";

import DetailTabs, {
  DetailTabConfig,
} from "@components/ui/DetailTabs/DetailTabs";

import StudentAttendanceTab from "@components/shared/AttendanceTab";
import StudentRankTab from "@features/admin/ranks/components";
import type { IntlMessageID } from "i18n/messages";
import StudentEventsTab from "./StudentEventsTab";

type StudentTabComponent = React.ComponentType<{ studentId: string }>;

type StudentTabConfig = Omit<
  DetailTabConfig<{ studentId: string }>,
  "label"
> & {
  labelId: IntlMessageID;
};

const STUDENT_TABS: StudentTabConfig[] = [
  {
    id: "ranks",
    labelId: "admin.students.tabs.ranks",
    icon: <EmojiEventsIcon sx={{ fontSize: 18 }} />,
    component: StudentRankTab as StudentTabComponent,
  },
  {
    id: "attendance",
    labelId: "admin.students.tabs.attendance",
    icon: <CalendarMonthIcon sx={{ fontSize: 18 }} />,
    component: StudentAttendanceTab as StudentTabComponent,
  },
  {
    id: "events",
    labelId: "page.events.title",
    icon: <EventIcon sx={{ fontSize: 18 }} />,
    component: StudentEventsTab as StudentTabComponent,
  },
];

interface Props {
  studentId: string;
}

const StudentDetailTabs = ({ studentId }: Props) => {
  const intl = useIntl();
  const tabs: DetailTabConfig<{ studentId: string }>[] = STUDENT_TABS.map(
    ({ labelId, ...tab }) => ({
      ...tab,
      label: intl.formatMessage({ id: labelId }),
    }),
  );

  return <DetailTabs tabs={tabs} componentProps={{ studentId }} />;
};

export default StudentDetailTabs;
