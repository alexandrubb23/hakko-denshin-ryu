import { useStudents } from "@hooks/useStudents";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PeopleIcon from "@mui/icons-material/People";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Container,
  Paper,
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

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const Students = () => {
  const { data: students, isLoading, isError } = useStudents();

  return (
    <Container maxWidth="lg" className="py-8">
      <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
        <PeopleIcon sx={{ color: "#AB96FF", fontSize: 32 }} />
        <Typography variant="h4" fontWeight={700}>
          Students
        </Typography>
        {students && (
          <Chip
            label={students.length}
            size="small"
            sx={{
              backgroundColor: "rgba(171,150,255,0.15)",
              color: "#AB96FF",
              fontWeight: 700,
            }}
          />
        )}
      </Stack>

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress sx={{ color: "#AB96FF" }} />
        </Box>
      )}

      {isError && (
        <Typography color="error" mt={4}>
          Failed to load students. Please try again.
        </Typography>
      )}

      {students && students.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.04)",
          }}
        >
          <PeopleIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
          <Typography color="text.secondary">No students found.</Typography>
        </Paper>
      )}

      {students && students.length > 0 && (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { borderBottomColor: "rgba(171,150,255,0.2)" } }}>
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
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{
                    "& td": { borderBottomColor: "rgba(171,150,255,0.2)" },
                    "&:last-child td": { border: 0 },
                    "&:hover": { backgroundColor: "rgba(171,150,255,0.05)" },
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
                        student.emailVerified
                          ? "Email verified"
                          : "Not verified"
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
      )}
    </Container>
  );
};

export default Students;
