import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";

import DetailTabs from "@components/ui/DetailTabs/DetailTabs";

import MyAttendanceTab from "@features/student/attendance/components/MyAttendanceTab";
import MyEventsTab from "@features/student/events/components/MyEventsTab";
import MyRankTab from "@features/student/ranks/components/MyRankTab";

const MY_TABS = [
  {
    id: "ranks",
    label: "Ranks",
    icon: <EmojiEventsIcon sx={{ fontSize: 18 }} />,
    component: MyRankTab,
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: <CalendarMonthIcon sx={{ fontSize: 18 }} />,
    component: MyAttendanceTab,
  },
  {
    id: "events",
    label: "Events",
    icon: <EventIcon sx={{ fontSize: 18 }} />,
    component: MyEventsTab,
  },
];

const MyDetailTabs = () => <DetailTabs tabs={MY_TABS} />;

export default MyDetailTabs;
