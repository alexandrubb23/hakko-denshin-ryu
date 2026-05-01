import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";
import { Box, Tab, Tabs } from "@mui/material";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

import { BORDER_COLOR, PURPLE } from "@style/tokens";

import StudentAttendanceTab from "./StudentAttendanceTab";
import StudentRankTab from "./StudentRankTab";

interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactElement;
  component: React.ComponentType<{ studentId: string }>;
  disabled?: boolean;
}

const STUDENT_TABS: TabConfig[] = [
  {
    id: "ranks",
    label: "Ranks",
    icon: <EmojiEventsIcon sx={{ fontSize: 18 }} />,
    component: StudentRankTab,
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: <CalendarMonthIcon sx={{ fontSize: 18 }} />,
    component: StudentAttendanceTab,
  },
  {
    id: "events",
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
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTabIndex = useMemo(() => {
    const tabParam = searchParams.get("tab");
    const idx = STUDENT_TABS.findIndex((t) => t.id === tabParam);
    return idx >= 0 ? idx : 0;
  }, [searchParams]);

  const handleTabChange = (_: React.SyntheticEvent, index: number) => {
    setSearchParams({ tab: STUDENT_TABS[index].id }, { replace: true });
  };

  const ActiveComponent = STUDENT_TABS[activeTabIndex].component;

  return (
    <Box sx={{ mt: 3 }}>
      <Tabs
        value={activeTabIndex}
        onChange={handleTabChange}
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
