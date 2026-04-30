import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Alert, Box, Button } from "@mui/material";
import { useState } from "react";

import { useStudentRanks } from "@hooks/useStudentRanks";
import { BORDER_COLOR, PURPLE } from "@style/tokens";

import CreateStudentRankModal from "./CreateStudentRankModal";
import RankTable from "./RankTable";

interface Props {
  studentId: string;
}

const StudentRankTab = ({ studentId }: Props) => {
  const { data: ranks, isLoading, isError } = useStudentRanks(studentId);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
          sx={{
            backgroundColor: PURPLE,
            color: "#0a0619",
            fontWeight: 700,
            "&:hover": { backgroundColor: "#c4b4ff" },
          }}
        >
          Assign Rank
        </Button>
      </Box>

      <CreateStudentRankModal
        studentId={studentId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load rank history. Please try again.
        </Alert>
      )}

      {!isLoading && !isError && ranks?.length === 0 && (
        <Alert
          icon={<InfoOutlinedIcon fontSize="inherit" />}
          severity="info"
          sx={{
            mt: 2,
            backgroundColor: "rgba(171,150,255,0.08)",
            color: PURPLE,
            border: `1px solid ${BORDER_COLOR}`,
            "& .MuiAlert-icon": { color: PURPLE },
          }}
        >
          This student has no ranks assigned yet.
        </Alert>
      )}

      {(isLoading || (ranks && ranks.length > 0)) && (
        <RankTable isLoading={isLoading} ranks={ranks} />
      )}
    </>
  );
};

export default StudentRankTab;
