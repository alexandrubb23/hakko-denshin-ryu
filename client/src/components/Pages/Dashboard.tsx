import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

import { authClient } from "@lib/auth-client";
import { Role } from "@lib/role";
import { Routes } from "@lib/routes";
import { BORDER_COLOR, PURPLE, SKELETON_SX, SURFACE_BG } from "@style/tokens";

const ADMIN_LINKS = [
  { label: "Manage Students", to: Routes.students, Icon: GroupIcon },
  { label: "Manage Events", to: Routes.adminEvents, Icon: EventIcon },
  {
    label: "Manage Techniques",
    to: Routes.techniques,
    Icon: SportsKabaddiIcon,
  },
  { label: "Kyu Program", to: Routes.kyuProgram, Icon: EmojiEventsIcon },
] as const;

const Dashboard = () => {
  const { data: session, isPending } = authClient.useSession();
  const isAdmin = session?.user.role === Role.admin;

  return (
    <Paper elevation={3} className="w-full p-8 flex flex-col gap-6">
      <Typography variant="h5" fontWeight={700}>
        {isPending ? (
          <Skeleton width="60%" sx={SKELETON_SX} />
        ) : (
          `Welcome, ${session?.user.name}!`
        )}
      </Typography>

      <Typography variant="body1" color="text.secondary">
        {isPending ? (
          <Skeleton width="80%" sx={SKELETON_SX} />
        ) : (
          session?.user.email
        )}
      </Typography>

      {isAdmin && (
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 2, textTransform: "uppercase", letterSpacing: 1 }}
          >
            Admin
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {ADMIN_LINKS.map(({ label, to, Icon }) => (
              <Card
                key={to}
                sx={{
                  flex: "1 1 160px",
                  backgroundColor: SURFACE_BG,
                  border: `1px solid ${BORDER_COLOR}`,
                  backdropFilter: "blur(20px)",
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
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      textAlign="center"
                    >
                      {label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default Dashboard;
