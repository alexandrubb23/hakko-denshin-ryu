import { ContentCard } from "./TabbedPageLayout.style";
import {
  SkeletonBlock,
  SkeletonGrid,
  SkeletonTabBar,
  SkeletonText,
  SkeletonTitle,
  SkeletonWrapper,
} from "./TabPageSkeleton.style";

interface TabPageSkeletonProps {
  tabBarHeight?: number;
  showDescription?: boolean;
  blockHeight?: number;
  blockCount?: number;
}

const TabPageSkeleton = ({
  tabBarHeight = 48,
  showDescription = false,
  blockHeight = 160,
  blockCount = 3,
}: TabPageSkeletonProps) => (
  <SkeletonWrapper>
    <SkeletonTabBar variant="rounded" height={tabBarHeight} />
    <ContentCard elevation={0}>
      <SkeletonTitle variant="text" width="40%" height={40} />
      {showDescription && (
        <>
          <SkeletonText variant="text" width="80%" sx={{ mt: 1 }} />
          <SkeletonText variant="text" width="60%" />
        </>
      )}
      <SkeletonGrid>
        {Array.from({ length: blockCount }, (_, i) => (
          <SkeletonBlock key={i} variant="rounded" height={blockHeight} />
        ))}
      </SkeletonGrid>
    </ContentCard>
  </SkeletonWrapper>
);

export default TabPageSkeleton;
