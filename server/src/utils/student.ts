import { Role } from "../generated/prisma/enums.js";
import { HttpNotFoundError } from "../lib/http-errors.js";
import { findStudentById } from "../repositories/students.repository.js";

/**
 * Resolves a user by id and asserts they are an active student.
 * Throws `HttpNotFoundError` for unknown ids, admin accounts, or soft-deleted students.
 */
export const requireStudent = async (id: string) => {
  const student = await findStudentById(id);
  if (!student || student.role !== Role.student || student.deletedAt !== null) {
    throw new HttpNotFoundError("Student not found");
  }
  return student;
};
