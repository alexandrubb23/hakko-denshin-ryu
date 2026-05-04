import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";

import DetailTabs from "@components/DetailTabs/DetailTabs";

import MyAttendanceTab from "./MyAttendanceTab";
import MyEventsTab from "./MyEventsTab";
import MyRankTab from "./MyRankTab";

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
