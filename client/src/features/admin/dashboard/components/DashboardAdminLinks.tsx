import type { SvgIconComponent } from "@mui/icons-material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

import { useDashboardEvents } from "@features/admin/dashboard/hooks/useDashboardEvents";
import { useDashboardStudents } from "@features/admin/dashboard/hooks/useDashboardStudents";
import { useKyuProgram } from "@features/public/kyu-program/useKyuProgram";
import { useTechniques } from "@features/public/techniques/useTechniques";
import { Routes } from "@lib/routes";
import { BACKDROP_BLUR, BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

import CountBadge from "@components/shared/CountBadge";

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
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mb: 2, textTransform: "uppercase", letterSpacing: 1 }}
      >
        Admin
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {adminLinks.map(({ label, to, Icon, count, isLoading }) => (
          <Card
            key={to}
            sx={{
              flex: "1 1 160px",
              backgroundColor: SURFACE_BG,
              border: `1px solid ${BORDER_COLOR}`,
              backdropFilter: BACKDROP_BLUR,
              backgroundImage: "none",
              transition: "border-color 200ms",
              "&:hover": { borderColor: PURPLE },
            }}
          >
            <CardActionArea component={Link} to={to} sx={{ p: 2.5 }}>
              <CardContent
                sx={{
                  p: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Icon sx={{ fontSize: 36, color: PURPLE }} />
                <Typography variant="body2" fontWeight={600} textAlign="center">
                  {label}
                </Typography>
                <CountBadge count={count} isLoading={isLoading} />
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardAdminLinks;
