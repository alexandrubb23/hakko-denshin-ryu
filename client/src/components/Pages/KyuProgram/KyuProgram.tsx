import blueBelt from "@assets/belts/blue.png";
import brownBelt from "@assets/belts/brown.png";
import greenBelt from "@assets/belts/green.png";
import orangeBelt from "@assets/belts/orange.png";
import yellowBelt from "@assets/belts/yellow.png";
import TabbedContent from "@components/Pages/shared/TabbedPageLayout/TabbedContent";
import TabbedPageLayout from "@components/Pages/shared/TabbedPageLayout/TabbedPageLayout";
import TabPageSkeleton from "@components/Pages/shared/TabbedPageLayout/TabPageSkeleton";
import { useKyuProgram } from "@hooks/useKyuProgram";
import useUrlTab from "@hooks/useUrlTab";
import {
  BeltImage,
  KihonLegend,
  LegendDot,
  LegendItem,
  TabLabelWrapper,
} from "./KyuProgram.style";

const BELT_IMAGES: Record<string, string> = {
  yellow: yellowBelt,
  orange: orangeBelt,
  green: greenBelt,
  blue: blueBelt,
  brown: brownBelt,
};

const KyuProgram = () => {
  const { data: levels, isLoading, isError } = useKyuProgram();
  const { activeTabIndex, handleTabChange } = useUrlTab(levels, "level");

  return (
    <TabbedPageLayout
      title="Kyu Program"
      isLoading={isLoading}
      isError={isError}
      errorMessage="Failed to load kyu program. Please try again."
      skeleton={<TabPageSkeleton tabBarHeight={80} blockHeight={180} />}
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
