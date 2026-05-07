import { Tab } from "@mui/material";

import useUrlTab from "@hooks/useUrlTab";

import { StyledTabs, WrapperBox } from "./DetailTabs.style";

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
    <WrapperBox>
      <StyledTabs
        value={activeTabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {tabs.map(({ label, icon }) => (
          <Tab key={label} label={label} icon={icon} iconPosition="start" />
        ))}
      </StyledTabs>

      <ActiveComponent {...(componentProps ?? {})} />
    </WrapperBox>
  );
};

export default DetailTabs;
