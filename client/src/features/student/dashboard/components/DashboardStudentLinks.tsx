import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

import { Routes } from "@lib/routes";
import { BACKDROP_BLUR, BORDER_COLOR, PURPLE, SURFACE_BG } from "@style/tokens";

const STUDENT_LINKS = [
  { label: "Techniques", to: Routes.techniques, Icon: SportsKabaddiIcon },
  { label: "Kyu Program", to: Routes.kyuProgram, Icon: EmojiEventsIcon },
] as const;

const DashboardStudentLinks = () => (
  <Box>
    <Typography
      variant="subtitle2"
      color="text.secondary"
      sx={{ mb: 2, textTransform: "uppercase", letterSpacing: 1 }}
    >
      Quick links
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {STUDENT_LINKS.map(({ label, to, Icon }) => (
        <Card
          key={to}
          sx={{
            flex: "1 1 140px",
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
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  </Box>
);

export default DashboardStudentLinks;
