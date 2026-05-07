import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { CardActionArea, Typography } from "@mui/material";
import { Link } from "react-router";

import { Routes } from "@lib/routes";

import {
  CARD_ACTION_SX,
  ICON_SX,
  LinkCard,
  LinksGrid,
  SectionLabel,
  StyledCardContent,
} from "./DashboardStudentLinks.style";

const STUDENT_LINKS = [
  { label: "Techniques", to: Routes.techniques, Icon: SportsKabaddiIcon },
  { label: "Kyu Program", to: Routes.kyuProgram, Icon: EmojiEventsIcon },
] as const;

const DashboardStudentLinks = () => (
  <div>
    <SectionLabel variant="subtitle2" color="text.secondary">
      Quick links
    </SectionLabel>
    <LinksGrid>
      {STUDENT_LINKS.map(({ label, to, Icon }) => (
        <LinkCard key={to}>
          <CardActionArea component={Link} to={to} sx={CARD_ACTION_SX}>
            <StyledCardContent>
              <Icon sx={ICON_SX} />
              <Typography variant="body2" fontWeight={600} textAlign="center">
                {label}
              </Typography>
            </StyledCardContent>
          </CardActionArea>
        </LinkCard>
      ))}
    </LinksGrid>
  </div>
);

export default DashboardStudentLinks;
