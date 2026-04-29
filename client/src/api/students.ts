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
  const res = await fetch(`${API_URL}${ApiRoutes.adminStudents}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch students");
  }

  const data = await res.json();
  return data.students;
};
