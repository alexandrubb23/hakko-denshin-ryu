import TabbedContent from "@components/Pages/shared/TabbedPageLayout/TabbedContent";
import TabbedPageLayout from "@components/Pages/shared/TabbedPageLayout/TabbedPageLayout";
import TabPageSkeleton from "@components/Pages/shared/TabbedPageLayout/TabPageSkeleton";
import { useTechniques } from "@hooks/useTechniques";
import useUrlTab from "@hooks/useUrlTab";
import { SuiteDescription } from "./Techniques.style";

const SUITE_SHORT: Record<string, string> = {
  "shodan-gi": "Shodan",
  "nidan-gi": "Nidan",
  "sandan-gi": "Sandan",
  "yondan-gi": "Yondan",
};

const Techniques = () => {
  const { data: suites, isLoading, isError } = useTechniques();
  const { activeTabIndex, handleTabChange } = useUrlTab(suites, "suite");

  return (
    <TabbedPageLayout
      title="Techniques"
      isLoading={isLoading}
      isError={isError}
      errorMessage="Failed to load techniques. Please try again."
      skeleton={<TabPageSkeleton showDescription blockHeight={160} />}
    >
      {suites && (
        <TabbedContent
          items={suites}
          activeIndex={activeTabIndex}
          onTabChange={handleTabChange}
          renderTabLabel={(suite) => SUITE_SHORT[suite.id] ?? suite.id}
          renderPanelHeader={(suite) => (
            <SuiteDescription variant="body2" color="text.secondary">
              {suite.description}
            </SuiteDescription>
          )}
        />
      )}
    </TabbedPageLayout>
  );
};

export default Techniques;
