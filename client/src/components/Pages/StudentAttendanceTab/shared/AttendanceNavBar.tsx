import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

import { BORDER_COLOR, DARK_BG, PURPLE, SURFACE_BG } from "@style/tokens";

export type CalendarView = "day" | "week" | "month" | "year";

const VIEWS: { value: CalendarView; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: SURFACE_BG,
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: 999,
  overflow: "hidden",
  padding: 4,
  gap: 8,
  "& .MuiToggleButton-root": {
    border: "none",
    borderRadius: 999,
    color: theme.palette.text.secondary,
    textTransform: "none",
    fontWeight: 600,
    padding: "6px 20px",
    "&.Mui-selected": {
      backgroundColor: PURPLE,
      color: DARK_BG,
      "&:hover": { backgroundColor: "#c4b4ff" },
    },
    "&:hover": { backgroundColor: "rgba(171,150,255,0.1)" },
  },
}));

const AttendanceNavBar = ({ view, onChange }: Props) => (
  <NavBarRoot>
    <StyledToggleButtonGroup
      value={view}
      exclusive
      onChange={(_, v) => v && onChange(v)}
      size="small"
    >
      {VIEWS.map(({ value, label }) => (
        <ToggleButton key={value} value={value}>
          {label}
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  </NavBarRoot>
);

export default AttendanceNavBar;
