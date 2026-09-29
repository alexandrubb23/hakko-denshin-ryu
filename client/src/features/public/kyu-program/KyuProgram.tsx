import { useIntl } from "react-intl";

import { BELT_IMAGES } from "@assets/beltImages";
import TabbedContent from "@components/shared/TabbedPageLayout/TabbedContent";

import TabbedPageLayout from "@components/shared/TabbedPageLayout/TabbedPageLayout";
import { useKyuProgram } from "@features/public/kyu-program/useKyuProgram";
import useUrlTab from "@hooks/useUrlTab";
import { TEXT_MUTED, WHITE_ALPHA_90 } from "@style/tokens";
import {
  BeltImage,
  KihonLegend,
  LegendDot,
  LegendItem,
  TabLabelWrapper,
} from "./KyuProgram.style";

const KyuProgram = () => {
  const intl = useIntl();
  const { data: levels, isLoading, isError } = useKyuProgram();
  const { activeTabIndex, handleTabChange } = useUrlTab(levels, "level");

  return (
    <TabbedPageLayout
      title={intl.formatMessage({ id: "page.kyu-program.title" })}
      isLoading={isLoading}
      isError={isError}
      errorMessage={intl.formatMessage({ id: "page.kyu-program.error" })}
    >
      {levels && (
        <TabbedContent
          items={levels}
          activeIndex={activeTabIndex}
          onTabChange={handleTabChange}
          compactTabs
          renderTabLabel={(level) => (
            <TabLabelWrapper>
              <BeltImage
                src={BELT_IMAGES[level.belt]}
                alt={intl.formatMessage(
                  { id: "page.kyu-program.belt.alt" },
                  { belt: level.belt },
                )}
              />
              {level.shortName}
            </TabLabelWrapper>
          )}
          renderPanelHeader={() => (
            <KihonLegend sx={{ mb: 2 }}>
              <LegendItem>
                <LegendDot isKihon />
                <span>Kihon waza</span>
              </LegendItem>
              <LegendItem sx={{ color: TEXT_MUTED }}>
                <LegendDot isKihon={false} />
                <span>Henka</span>
              </LegendItem>
            </KihonLegend>
          )}
          getTechniqueItemSx={(technique) => ({
            color: technique.isKihon ? WHITE_ALPHA_90 : TEXT_MUTED,
            fontWeight: technique.isKihon ? 600 : 400,
          })}
        />
      )}
    </TabbedPageLayout>
  );
};

export default KyuProgram;
