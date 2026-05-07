import type { SvgIconComponent } from "@mui/icons-material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { Box, CardActionArea, Typography } from "@mui/material";
import { Link } from "react-router";

import CountBadge from "@components/shared/CountBadge";
import { useDashboardEvents } from "@features/admin/dashboard/hooks/useDashboardEvents";
import { useDashboardStudents } from "@features/admin/dashboard/hooks/useDashboardStudents";
import { useKyuProgram } from "@features/public/kyu-program/useKyuProgram";
import { useTechniques } from "@features/public/techniques/useTechniques";
import { Routes } from "@lib/routes";

import {
  CARD_ACTION_SX,
  ICON_SX,
  LinkCard,
  LinksGrid,
  SectionLabel,
  StyledCardContent,
} from "./DashboardAdminLinks.style";

interface AdminLinkItem {
  label: string;
  to: string;
  Icon: SvgIconComponent;
  count: number | undefined;
  isLoading: boolean;
}

const DashboardAdminLinks = () => {
  const { data: studentStats, isLoading: studentsLoading } =
    useDashboardStudents();
  const { data: eventStats, isLoading: eventsLoading } = useDashboardEvents();
  const { data: techniques, isLoading: techniquesLoading } = useTechniques();
  const { data: kyuProgram, isLoading: kyuLoading } = useKyuProgram();

  const techniqueCount = techniques
    ?.flatMap((s) => s.groups)
    .flatMap((g) => g.techniques).length;

  const adminLinks: AdminLinkItem[] = [
    {
      label: "Manage Students",
      to: Routes.students,
      Icon: GroupIcon,
      count: studentStats?.total,
      isLoading: studentsLoading,
    },
    {
      label: "Manage Events",
      to: Routes.adminEvents,
      Icon: EventIcon,
      count: eventStats?.total,
      isLoading: eventsLoading,
    },
    {
      label: "Manage Techniques",
      to: Routes.techniques,
      Icon: SportsKabaddiIcon,
      count: techniqueCount,
      isLoading: techniquesLoading,
    },
    {
      label: "Kyu Program",
      to: Routes.kyuProgram,
      Icon: EmojiEventsIcon,
      count: kyuProgram?.length,
      isLoading: kyuLoading,
    },
  ];

  return (
    <Box>
      <SectionLabel variant="subtitle2" color="text.secondary">
        Admin
      </SectionLabel>
      <LinksGrid>
        {adminLinks.map(({ label, to, Icon, count, isLoading }) => (
          <LinkCard key={to}>
            <CardActionArea component={Link} to={to} sx={CARD_ACTION_SX}>
              <StyledCardContent>
                <Icon sx={ICON_SX} />
                <Typography variant="body2" fontWeight={600} textAlign="center">
                  {label}
                </Typography>
                <CountBadge count={count} isLoading={isLoading} />
              </StyledCardContent>
            </CardActionArea>
          </LinkCard>
        ))}
      </LinksGrid>
    </Box>
  );
};

export default DashboardAdminLinks;
