import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";
import { Box, Tab, Tabs } from "@mui/material";

import useUrlTab from "@hooks/useUrlTab";
import { BORDER_COLOR, PURPLE } from "@style/tokens";

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

const MyDetailTabs = () => {
  const { activeTabIndex, handleTabChange } = useUrlTab(MY_TABS, "tab");
  const ActiveComponent = MY_TABS[activeTabIndex].component;

  return (
    <Box sx={{ mt: 3 }}>
      <Tabs
        value={activeTabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          borderBottom: `1px solid ${BORDER_COLOR}`,
          "& .MuiTab-root": {
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 600,
          },
          "& .Mui-selected": { color: PURPLE },
          "& .MuiTabs-indicator": { backgroundColor: PURPLE },
          "& .MuiTabs-scrollButtons": { color: PURPLE },
        }}
      >
        {MY_TABS.map(({ label, icon }) => (
          <Tab key={label} label={label} icon={icon} iconPosition="start" />
        ))}
      </Tabs>

      <ActiveComponent />
    </Box>
  );
};

export default MyDetailTabs;
