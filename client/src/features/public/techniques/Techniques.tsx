import { useIntl } from "react-intl";

import TabbedContent from "@components/shared/TabbedPageLayout/TabbedContent";
import TabbedPageLayout from "@components/shared/TabbedPageLayout/TabbedPageLayout";
import { useTechniques } from "@features/public/techniques/useTechniques";
import useUrlTab from "@hooks/useUrlTab";
import { SuiteDescription } from "./Techniques.style";

const SUITE_SHORT: Record<string, string> = {
  "shodan-gi": "Shodan",
  "nidan-gi": "Nidan",
  "sandan-gi": "Sandan",
  "yondan-gi": "Yondan",
};

const Techniques = () => {
  const intl = useIntl();
  const { data: suites, isLoading, isError } = useTechniques();
  const { activeTabIndex, handleTabChange } = useUrlTab(suites, "suite");

  return (
    <TabbedPageLayout
      title={intl.formatMessage({ id: "page.techniques.title" })}
      isLoading={isLoading}
      isError={isError}
      errorMessage={intl.formatMessage({ id: "page.techniques.error" })}
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
