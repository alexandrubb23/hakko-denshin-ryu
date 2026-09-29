import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";
import { useIntl } from "react-intl";

import DetailTabs from "@components/ui/DetailTabs/DetailTabs";

import MyAttendanceTab from "@features/student/attendance/components/MyAttendanceTab";
import MyEventsTab from "@features/student/events/components/MyEventsTab";
import MyRankTab from "@features/student/ranks/components/MyRankTab";

const MY_TABS = [
  {
    id: "ranks",
    labelId: "student.tabs.ranks",
    icon: <EmojiEventsIcon sx={{ fontSize: 18 }} />,
    component: MyRankTab,
  },
  {
    id: "attendance",
    labelId: "student.tabs.attendance",
    icon: <CalendarMonthIcon sx={{ fontSize: 18 }} />,
    component: MyAttendanceTab,
  },
  {
    id: "events",
    labelId: "student.tabs.events",
    icon: <EventIcon sx={{ fontSize: 18 }} />,
    component: MyEventsTab,
  },
] as const;

const MyDetailTabs = () => {
  const intl = useIntl();
  const tabs = MY_TABS.map(({ labelId, ...tab }) => ({
    ...tab,
    label: intl.formatMessage({ id: labelId }),
  }));

  return <DetailTabs tabs={tabs} />;
};

export default MyDetailTabs;
