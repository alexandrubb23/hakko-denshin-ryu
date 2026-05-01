import {
  SkeletonBlock,
  SkeletonGrid,
  SkeletonTabBar,
  SkeletonText,
  SkeletonTitle,
  SkeletonWrapper,
  SuiteCard,
} from "./TechniquesSkeleton.style";

const TechniquesSkeleton = () => (
  <SkeletonWrapper>
    <SkeletonTabBar variant="rounded" height={48} />
    <SuiteCard elevation={0}>
      <SkeletonTitle variant="text" width="40%" height={40} />
      <SkeletonText variant="text" width="80%" sx={{ mt: 1 }} />
      <SkeletonText variant="text" width="60%" />
      <SkeletonGrid>
        {[1, 2, 3].map((j) => (
          <SkeletonBlock key={j} variant="rounded" height={160} />
        ))}
      </SkeletonGrid>
    </SuiteCard>
  </SkeletonWrapper>
);

export default TechniquesSkeleton;
