import { BELT_IMAGES } from "@assets/beltImages";
import TabbedContent from "@components/Pages/shared/TabbedPageLayout/TabbedContent";
import TabbedPageLayout from "@components/Pages/shared/TabbedPageLayout/TabbedPageLayout";
import { useKyuProgram } from "@hooks/useKyuProgram";
import useUrlTab from "@hooks/useUrlTab";
import {
  BeltImage,
  KihonLegend,
  LegendDot,
  LegendItem,
  TabLabelWrapper,
} from "./KyuProgram.style";

const KyuProgram = () => {
  const { data: levels, isLoading, isError } = useKyuProgram();
  const { activeTabIndex, handleTabChange } = useUrlTab(levels, "level");

  return (
    <TabbedPageLayout
      title="Kyu Program"
      isLoading={isLoading}
      isError={isError}
      errorMessage="Failed to load kyu program. Please try again."
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
                alt={`${level.belt} belt`}
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
              <LegendItem sx={{ color: "rgba(255,255,255,0.5)" }}>
                <LegendDot isKihon={false} />
                <span>Henka</span>
              </LegendItem>
            </KihonLegend>
          )}
          getTechniqueItemSx={(technique) => ({
            color: technique.isKihon
              ? "rgba(255,255,255,0.9)"
              : "rgba(255,255,255,0.5)",
            fontWeight: technique.isKihon ? 600 : 400,
          })}
        />
      )}
    </TabbedPageLayout>
  );
};

export default KyuProgram;
