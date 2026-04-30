import AddIcon from "@mui/icons-material/Add";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Alert, Box, Button } from "@mui/material";
import { useState } from "react";

import { type StudentRankEntry } from "@api/students";
import { useStudentRanks } from "@hooks/useStudentRanks";
import { BORDER_COLOR, PURPLE } from "@style/tokens";

import CreateStudentRankModal from "./CreateStudentRankModal";
import DeleteRankModal from "./DeleteRankModal";
import EditStudentRankModal from "./EditStudentRankModal";
import RankTable from "./RankTable";

interface Props {
  studentId: string;
}

const StudentRankTab = ({ studentId }: Props) => {
  const { data: ranks, isLoading, isError } = useStudentRanks(studentId);
  const [createOpen, setCreateOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<StudentRankEntry | null>(null);
  const [deleteEntry, setDeleteEntry] = useState<StudentRankEntry | null>(null);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateOpen(true)}
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
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      {editEntry && (
        <EditStudentRankModal
          studentId={studentId}
          entry={editEntry}
          open={true}
          onClose={() => setEditEntry(null)}
        />
      )}

      {deleteEntry && (
        <DeleteRankModal
          studentId={studentId}
          entry={deleteEntry}
          open={true}
          onClose={() => setDeleteEntry(null)}
        />
      )}

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
        <RankTable
          isLoading={isLoading}
          ranks={ranks}
          onEdit={setEditEntry}
          onDelete={setDeleteEntry}
        />
      )}
    </>
  );
};

export default StudentRankTab;
