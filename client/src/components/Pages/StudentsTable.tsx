import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Avatar,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import { type Student } from "@api/students";

interface StudentsTableProps {
  students: Student[] | undefined;
  isLoading: boolean;
}

const SKEL = { bgcolor: "rgba(171,150,255,0.12)" };
const SKELETON_ROWS = 7;

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const StudentsTable = ({ students, isLoading }: StudentsTableProps) => (
  <TableContainer
    component={Paper}
    elevation={0}
    sx={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 2 }}
  >
    <Table>
      <TableHead>
        <TableRow
          sx={{ "& th": { borderBottomColor: "rgba(171,150,255,0.2)" } }}
        >
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
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading
          ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
              <TableRow
                key={i}
                sx={{
                  "& td": { borderBottomColor: "rgba(171,150,255,0.2)" },
                  "&:last-child td": { border: 0 },
                }}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <Skeleton
                      variant="circular"
                      width={36}
                      height={36}
                      sx={SKEL}
                    />
                    <Skeleton variant="text" width={120} sx={SKEL} />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={180} sx={SKEL} />
                </TableCell>
                <TableCell align="center">
                  <Skeleton
                    variant="circular"
                    width={20}
                    height={20}
                    sx={{ ...SKEL, mx: "auto" }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={80} sx={SKEL} />
                </TableCell>
              </TableRow>
            ))
          : students!.map((student) => (
              <TableRow
                key={student.id}
                sx={{
                  "& td": { borderBottomColor: "rgba(171,150,255,0.2)" },
                  "&:last-child td": { border: 0 },
                  "&:hover": {
                    backgroundColor: "rgba(171,150,255,0.05)",
                  },
                }}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        backgroundColor: "rgba(171,150,255,0.25)",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#AB96FF",
                      }}
                    >
                      {getInitials(student.name)}
                    </Avatar>
                    <Typography variant="body2" fontWeight={600}>
                      {student.name}
                    </Typography>
                  </Stack>
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
                        sx={{ color: "#4caf50", fontSize: 20 }}
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
              </TableRow>
            ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default StudentsTable;
