import axios from "axios";

import { type CreateStudentInput, type UpdateStudentInput } from "@hakko/core";
import { ApiRoutes } from "@lib/routes";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export interface Student {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
}

export const fetchStudents = async (): Promise<Student[]> => {
  const { data } = await axios.get(`${API_URL}${ApiRoutes.adminStudents}`, {
    withCredentials: true,
  });

  return data.students;
};

export const createStudent = async (
  payload: CreateStudentInput
): Promise<Student> => {
  const { data } = await axios.post(
    `${API_URL}${ApiRoutes.adminStudents}`,
    payload,
    { withCredentials: true }
  );

  return data.student;
};

export const updateStudent = async (
  id: string,
  payload: UpdateStudentInput
): Promise<Student> => {
  const { data } = await axios.put(
    `${API_URL}${ApiRoutes.adminStudent(id)}`,
    payload,
    { withCredentials: true }
  );

  return data.student;
};

export const deleteStudent = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}${ApiRoutes.adminStudent(id)}`, {
    withCredentials: true,
  });
};
