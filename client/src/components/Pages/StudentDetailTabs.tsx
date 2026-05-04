import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";

import DetailTabs, { DetailTabConfig } from "@components/DetailTabs/DetailTabs";

import StudentAttendanceTab from "./StudentAttendanceTab";
import StudentEventsTab from "./StudentEventsTab";
import StudentRankTab from "./StudentRankTab";

type StudentTabComponent = React.ComponentType<{ studentId: string }>;

const STUDENT_TABS: DetailTabConfig<{ studentId: string }>[] = [
  {
    id: "ranks",
    label: "Ranks",
    icon: <EmojiEventsIcon sx={{ fontSize: 18 }} />,
    component: StudentRankTab as StudentTabComponent,
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: <CalendarMonthIcon sx={{ fontSize: 18 }} />,
    component: StudentAttendanceTab as StudentTabComponent,
  },
  {
    id: "events",
    label: "Events",
    icon: <EventIcon sx={{ fontSize: 18 }} />,
    component: StudentEventsTab as StudentTabComponent,
  },
];

interface Props {
  studentId: string;
}

const StudentDetailTabs = ({ studentId }: Props) => (
  <DetailTabs tabs={STUDENT_TABS} componentProps={{ studentId }} />
);

export default StudentDetailTabs;
