import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";

import { type KyuLevel } from "@api/kyuProgram";
import { BELT_IMAGES } from "@assets/beltImages";
import { ContentDivider } from "@components/shared/TabbedPageLayout/TabbedPageLayout.style";
import TechniqueGroupsList from "@components/shared/TabbedPageLayout/TechniqueGroupsList";
import ModalDialog from "@components/ui/ModalDialog/ModalDialog";
import ModalTitle from "@components/ui/ModalTitle/ModalTitle";
import {
  KihonLegend,
  LegendDot,
  LegendItem,
} from "@features/public/kyu-program/KyuProgram.style";
import { BORDER_COLOR, TEXT_MUTED, WHITE_ALPHA_90 } from "@style/tokens";

interface Props {
  level: KyuLevel;
  open: boolean;
  onClose: () => void;
}

const NextRankModal = ({ level, open, onClose }: Props) => (
  <ModalDialog open={open} onClose={onClose} maxWidth="sm">
    <ModalTitle>
      <Box
        component="img"
        src={BELT_IMAGES[level.belt] ?? BELT_IMAGES.white}
        alt={`${level.belt} belt`}
        sx={{ height: 20, width: "auto", maxWidth: 52, objectFit: "contain" }}
      />
      {level.name}
    </ModalTitle>

    <Divider sx={{ borderColor: BORDER_COLOR }} />

    <DialogContent sx={{ pt: 2.5 }}>
      <KihonLegend sx={{ mb: 2 }}>
        <LegendItem>
          <LegendDot isKihon />
          <span>Kihon waza</span>
        </LegendItem>
        <LegendItem sx={{ color: TEXT_MUTED }}>
          <LegendDot isKihon={false} />
          <span>Henka</span>
        </LegendItem>
      </KihonLegend>

      <ContentDivider />

      <TechniqueGroupsList
        groups={level.groups}
        getTechniqueSx={(t) => ({
          color: t.isKihon ? WHITE_ALPHA_90 : TEXT_MUTED,
          fontWeight: t.isKihon ? 600 : 400,
        })}
      />
    </DialogContent>

    <DialogActions sx={{ px: 3, pb: 3 }}>
      <Button onClick={onClose} sx={{ color: "text.secondary" }}>
        Close
      </Button>
    </DialogActions>
  </ModalDialog>
);

export default NextRankModal;
