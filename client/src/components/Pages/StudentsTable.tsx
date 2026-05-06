import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import PeopleIcon from "@mui/icons-material/People";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

import { type Student } from "@api/students";
import CenterSpinner from "@components/Spinner/CenterSpinner";

import { Routes } from "@lib/routes";
import {
  ERROR_SOFT_TEXT,
  ERROR_SOFT_TEXT_ALPHA_12,
  SUCCESS,
} from "@style/status.tokens";
import {
  BORDER_COLOR,
  PURPLE,
  PURPLE_ALPHA_05,
  PURPLE_ALPHA_12,
  PURPLE_ALPHA_25,
  SURFACE_BG,
} from "@style/tokens";
import { getInitials } from "@utils/string";
import DeleteStudentModal from "./DeleteStudentModal";
import EditStudentModal from "./EditStudentModal";

interface StudentsTableProps {
  students: Student[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

const StudentsTable = ({
  students,
  isLoading,
  isError,
}: StudentsTableProps) => {
  const navigate = useNavigate();
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

  if (isError) {
    return (
      <Typography color="error" mt={4}>
        Failed to load students. Please try again.
      </Typography>
    );
  }

  if (isLoading) return <CenterSpinner />;

  if (students?.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: "center",
          backgroundColor: SURFACE_BG,
        }}
      >
        <PeopleIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
        <Typography color="text.secondary">No students found.</Typography>
      </Paper>
    );
  }

  if (!students) {
    return null;
  }

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ backgroundColor: SURFACE_BG, borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { borderBottomColor: BORDER_COLOR } }}>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                Student
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                Email
              </TableCell>
              <TableCell
                sx={{ fontWeight: 700, color: "text.secondary" }}
                align="center"
              >
                Verified
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>
                Joined
              </TableCell>
              <TableCell
                sx={{ fontWeight: 700, color: "text.secondary" }}
                align="right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                onClick={() => navigate(Routes.studentDetail(student.id))}
                sx={{
                  cursor: "pointer",
                  "& td": { borderBottomColor: BORDER_COLOR },
                  "&:last-child td": { border: 0 },
                  "&:hover": {
                    backgroundColor: PURPLE_ALPHA_05,
                  },
                }}
              >
                <TableCell>
                  <Avatar
                    src={student.image ?? undefined}
                    sx={{
                      width: 36,
                      height: 36,
                      backgroundColor: PURPLE_ALPHA_25,
                      fontSize: 14,
                      fontWeight: 700,
                      color: PURPLE,
                      display: "inline-flex",
                      mr: 1.5,
                      verticalAlign: "middle",
                    }}
                  >
                    {getInitials(student.name)}
                  </Avatar>
                  <Typography
                    component="span"
                    variant="body2"
                    fontWeight={600}
                    sx={{ verticalAlign: "middle" }}
                  >
                    {student.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {student.email}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip
                    title={
                      student.emailVerified ? "Email verified" : "Not verified"
                    }
                  >
                    {student.emailVerified ? (
                      <CheckCircleOutlineIcon
                        sx={{ color: SUCCESS, fontSize: 20 }}
                      />
                    ) : (
                      <RadioButtonUncheckedIcon
                        sx={{ color: "text.disabled", fontSize: 20 }}
                      />
                    )}
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit student">
                    <IconButton
                      aria-label="Edit student"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingStudent(student);
                      }}
                      sx={{
                        color: PURPLE,
                        "&:hover": {
                          backgroundColor: PURPLE_ALPHA_12,
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete student">
                    <IconButton
                      aria-label="Delete student"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingStudent(student);
                      }}
                      sx={{
                        color: ERROR_SOFT_TEXT,
                        "&:hover": {
                          backgroundColor: ERROR_SOFT_TEXT_ALPHA_12,
                        },
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editingStudent && (
        <EditStudentModal
          open
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
        />
      )}

      {deletingStudent && (
        <DeleteStudentModal
          open
          student={deletingStudent}
          onClose={() => setDeletingStudent(null)}
        />
      )}
    </>
  );
};

export default StudentsTable;
