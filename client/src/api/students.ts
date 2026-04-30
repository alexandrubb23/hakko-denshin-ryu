import axios from "axios";

import { type CreateStudentInput } from "@hakko/core";
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
