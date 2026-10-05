import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useIntl } from "react-intl";

import { type Student } from "@api/students";
import ErrorAlert from "@components/shared/ErrorAlert";
import PageHeader from "@components/shared/PageHeader";
import { exportStudentsPdf } from "@features/admin/students/utils/exportStudentsPdf";
import { PURPLE, PURPLE_ALPHA_12 } from "@style/tokens";

interface StudentsHeaderProps {
  students: Student[] | undefined;
  onAdd: () => void;
}

const StudentsHeader = ({ students, onAdd }: StudentsHeaderProps) => {
  const intl = useIntl();
  const [isExporting, setIsExporting] = useState(false);
  const [exportFailed, setExportFailed] = useState(false);

  const handleExport = async () => {
    if (!students) return;
    setIsExporting(true);
    setExportFailed(false);
    try {
      await exportStudentsPdf(students, intl);
    } catch {
      setExportFailed(true);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <PageHeader
        icon={<PeopleIcon fontSize="inherit" />}
        title={intl.formatMessage({ id: "admin.students.title" })}
        count={students?.length}
        addIcon={<PersonAddIcon />}
        addLabel={intl.formatMessage({ id: "admin.students.add" })}
        onAdd={onAdd}
        actions={
          <Button
            variant="outlined"
            startIcon={
              isExporting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <PictureAsPdfIcon />
              )
            }
            onClick={handleExport}
            disabled={!students?.length || isExporting}
            sx={{
              color: PURPLE,
              borderColor: PURPLE,
              fontWeight: 700,
              "&:hover": {
                borderColor: PURPLE,
                backgroundColor: PURPLE_ALPHA_12,
              },
            }}
          >
            {intl.formatMessage({
              id: isExporting
                ? "admin.students.export.pending"
                : "admin.students.export",
            })}
          </Button>
        }
      />
      {exportFailed && (
        <ErrorAlert
          sx={{ mt: 0, mb: 3 }}
          onClose={() => setExportFailed(false)}
        >
          {intl.formatMessage({ id: "admin.students.export.error" })}
        </ErrorAlert>
      )}
    </>
  );
};

export default StudentsHeader;
