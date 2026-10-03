import { useIntl } from "react-intl";

import TabbedContent from "@components/shared/TabbedPageLayout/TabbedContent";
import TabbedPageLayout from "@components/shared/TabbedPageLayout/TabbedPageLayout";
import { gradeName } from "@features/public/hakko-ryu/syllabusData";
import { useTechniques } from "@features/public/techniques/useTechniques";
import useUrlTab from "@hooks/useUrlTab";
import { SuiteDescription } from "./Techniques.style";

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
          renderTabLabel={gradeName}
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
