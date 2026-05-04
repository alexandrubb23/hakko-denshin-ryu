import { Box, Divider, Skeleton, Typography } from "@mui/material";

import { type StudentRankEntry } from "@api/students";
import { BORDER_COLOR, SKELETON_SX } from "@style/tokens";

import BeltImage from "./StudentRankTab/BeltImage";

interface Props {
  latestRank?: StudentRankEntry;
  isLoading?: boolean;
}

const StudentCurrentRank = ({ latestRank, isLoading }: Props) => {
  if (!isLoading && !latestRank) return null;

  return (
    <>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: BORDER_COLOR, display: { xs: "none", sm: "block" } }}
      />
      <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.65rem" }}
        >
          Current Rank
        </Typography>
        {isLoading ? (
          <Box mt={0.75}>
            <Skeleton
              variant="rectangular"
              width={96}
              height={24}
              sx={{ ...SKELETON_SX, borderRadius: 1 }}
            />
            <Skeleton width={110} height={20} sx={{ ...SKELETON_SX, mt: 0.75 }} />
            <Skeleton width={90} height={16} sx={{ ...SKELETON_SX, mt: 0.5 }} />
          </Box>
        ) : latestRank ? (
          <Box mt={0.75}>
            <BeltImage belt={latestRank.rank.belt} />
            <Typography variant="body2" fontWeight={600} mt={0.75}>
              {latestRank.rank.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Since {new Date(latestRank.awardedAt).toLocaleDateString()}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default StudentCurrentRank;
