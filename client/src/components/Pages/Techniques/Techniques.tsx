import { useTechniques } from "@hooks/useTechniques";
import useUrlTab from "@hooks/useUrlTab";
import { Typography } from "@mui/material";
import {
  ErrorAlert,
  GroupCard,
  GroupsGrid,
  GroupTitle,
  PageWrapper,
  SuiteDescription,
  SuiteDivider,
  SuiteName,
  SuiteTab,
  SuiteTabs,
  TechniqueItem,
  TechniqueList,
} from "./Techniques.style";
import TechniquesSkeleton from "./TechniquesSkeleton";
import { SuiteCard } from "./TechniquesSkeleton.style";

const SUITE_SHORT: Record<string, string> = {
  "shodan-gi": "Shodan",
  "nidan-gi": "Nidan",
  "sandan-gi": "Sandan",
  "yondan-gi": "Yondan",
};

const Techniques = () => {
  const { data: suites, isLoading, isError } = useTechniques();
  const { activeTabIndex, handleTabChange } = useUrlTab(suites, "suite");

  const activeSuite = suites?.[activeTabIndex];

  return (
    <PageWrapper>
      <Typography variant="h5" fontWeight={700}>
        Techniques
      </Typography>

      {isLoading && <TechniquesSkeleton />}

      {isError && (
        <ErrorAlert severity="error">
          Failed to load techniques. Please try again.
        </ErrorAlert>
      )}

      {suites && (
        <>
          <SuiteTabs
            value={activeTabIndex}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {suites.map((suite, idx) => (
              <SuiteTab
                key={suite.id}
                label={SUITE_SHORT[suite.id] ?? suite.id}
                value={idx}
              />
            ))}
          </SuiteTabs>

          {activeSuite && (
            <SuiteCard elevation={0}>
              <SuiteName variant="h6">{activeSuite.name}</SuiteName>
              <SuiteDescription variant="body2" color="text.secondary">
                {activeSuite.description}
              </SuiteDescription>

              <SuiteDivider />

              <GroupsGrid>
                {activeSuite.groups.map((group) => (
                  <GroupCard key={group.id}>
                    <GroupTitle variant="subtitle2">{group.name}</GroupTitle>
                    <TechniqueList component="ol">
                      {group.techniques.map((technique) => (
                        <TechniqueItem
                          component="li"
                          key={`${group.id}-${technique.number}`}
                        >
                          {technique.name}
                        </TechniqueItem>
                      ))}
                    </TechniqueList>
                  </GroupCard>
                ))}
              </GroupsGrid>
            </SuiteCard>
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default Techniques;
