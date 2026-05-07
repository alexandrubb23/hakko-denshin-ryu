import { Box, Tab, Tabs } from "@mui/material";

import useUrlTab from "@hooks/useUrlTab";
import { BORDER_COLOR, PURPLE } from "@style/tokens";

export interface DetailTabConfig<P = any> {
  id: string;
  label: string;
  icon: React.ReactElement;
  component: React.ComponentType<P>;
  disabled?: boolean;
}

interface Props {
  tabs: DetailTabConfig[];
  componentProps?: Record<string, unknown>;
}

const DetailTabs = ({ tabs, componentProps }: Props) => {
  const { activeTabIndex, handleTabChange } = useUrlTab(tabs, "tab");
  const ActiveComponent = tabs[activeTabIndex].component;

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
        {tabs.map(({ label, icon }) => (
          <Tab key={label} label={label} icon={icon} iconPosition="start" />
        ))}
      </Tabs>

      <ActiveComponent {...(componentProps ?? {})} />
    </Box>
  );
};

export default DetailTabs;
