import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import { BORDER_COLOR, PURPLE } from "@style/tokens";

import StudentRankTab from "./StudentRankTab";

interface TabConfig {
  label: string;
  icon: React.ReactElement;
  component: React.ComponentType<{ studentId: string }>;
  disabled?: boolean;
}

const STUDENT_TABS: TabConfig[] = [
  {
    label: "Ranks",
    icon: <EmojiEventsIcon sx={{ fontSize: 18 }} />,
    component: StudentRankTab,
  },
  {
    label: "Attendance",
    icon: <CalendarMonthIcon sx={{ fontSize: 18 }} />,
    component: () => null,
    disabled: true,
  },
  {
    label: "Events",
    icon: <EventIcon sx={{ fontSize: 18 }} />,
    component: () => null,
    disabled: true,
  },
];

interface Props {
  studentId: string;
}

const StudentDetailTabs = ({ studentId }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = STUDENT_TABS[activeTab].component;

  return (
    <Box sx={{ mt: 3 }}>
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        sx={{
          borderBottom: `1px solid ${BORDER_COLOR}`,
          "& .MuiTab-root": {
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 600,
          },
          "& .Mui-selected": { color: PURPLE },
          "& .MuiTabs-indicator": { backgroundColor: PURPLE },
        }}
      >
        {STUDENT_TABS.map(({ label, icon, disabled }) => (
          <Tab
            key={label}
            label={label}
            icon={icon}
            iconPosition="start"
            disabled={disabled}
          />
        ))}
      </Tabs>

      <ActiveComponent studentId={studentId} />
    </Box>
  );
};

export default StudentDetailTabs;
