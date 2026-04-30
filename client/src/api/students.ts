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

class StudentsApi {
  private readonly http = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  async fetchStudents(): Promise<Student[]> {
    const { data } = await this.http.get(ApiRoutes.adminStudents);
    return data.students;
  }

  async createStudent(payload: CreateStudentInput): Promise<Student> {
    const { data } = await this.http.post(ApiRoutes.adminStudents, payload);
    return data.student;
  }

  async fetchStudent(id: string): Promise<Student> {
    const { data } = await this.http.get(ApiRoutes.adminStudent(id));
    return data.student;
  }

  async updateStudent(id: string, payload: UpdateStudentInput): Promise<Student> {
    const { data } = await this.http.put(ApiRoutes.adminStudent(id), payload);
    return data.student;
  }

  async deleteStudent(id: string): Promise<void> {
    await this.http.delete(ApiRoutes.adminStudent(id));
  }
}

export const studentsApi = new StudentsApi();
