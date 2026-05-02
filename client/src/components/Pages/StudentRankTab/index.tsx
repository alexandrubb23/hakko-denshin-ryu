import AddIcon from "@mui/icons-material/Add";
import { Alert, Box, Button } from "@mui/material";
import { useState } from "react";

import { type StudentRankEntry } from "@api/students";
import { useStudentRanks } from "@hooks/useStudentRanks";
import { DARK_BG, PURPLE, PURPLE_HOVER } from "@style/tokens";

import InfoAlert from "../shared/InfoAlert";
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
            color: DARK_BG,
            fontWeight: 700,
            "&:hover": { backgroundColor: PURPLE_HOVER },
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
        <InfoAlert>This student has no ranks assigned yet.</InfoAlert>
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
