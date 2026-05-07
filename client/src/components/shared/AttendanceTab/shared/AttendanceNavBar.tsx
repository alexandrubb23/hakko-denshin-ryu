import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  BORDER_COLOR,
  DARK_BG,
  PURPLE,
  PURPLE_ALPHA_10,
  SURFACE_BG,
  TEXT_MUTED,
} from "@style/tokens";

import { CalendarView } from "./calendarView";

export { CalendarView };

const VIEWS: { value: CalendarView; label: string }[] = [
  { value: CalendarView.day, label: "Day" },
  { value: CalendarView.week, label: "Week" },
  { value: CalendarView.month, label: "Month" },
  { value: CalendarView.year, label: "Year" },
];

interface Props {
  view: CalendarView;
  onChange: (view: CalendarView) => void;
}

const NavBarRoot = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginBottom: 24,
});

const StyledTabs = styled(Tabs)({
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 999,
  padding: 4,
  minHeight: "unset",
  "& .MuiTabs-flexContainer": { gap: 8 },
  "& .MuiTabs-indicator": {
    height: "100%",
    borderRadius: 999,
    backgroundColor: PURPLE,
    zIndex: 0,
  },
  "& .MuiTab-root": {
    position: "relative",
    zIndex: 1,
    border: "none",
    borderRadius: 999,
    color: TEXT_MUTED,
    textTransform: "none",
    fontWeight: 600,
    padding: "6px 20px",
    minHeight: "unset",
    minWidth: "unset",
    transition: "color 0.2s",
    "&.Mui-selected": {
      color: DARK_BG,
    },
    "&:hover:not(.Mui-selected)": {
      backgroundColor: PURPLE_ALPHA_10,
    },
  },
  "& .MuiTabs-scrollButtons": { color: PURPLE },
});

const AttendanceNavBar = ({ view, onChange }: Props) => {
  const activeIndex = VIEWS.findIndex((v) => v.value === view);

  return (
    <NavBarRoot>
      <StyledTabs
        value={activeIndex}
        onChange={(_, i) => onChange(VIEWS[i].value)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        slotProps={{
          indicator: {
            children: <span />,
          },
        }}
      >
        {VIEWS.map(({ value, label }) => (
          <Tab key={value} label={label} />
        ))}
      </StyledTabs>
    </NavBarRoot>
  );
};

export default AttendanceNavBar;
