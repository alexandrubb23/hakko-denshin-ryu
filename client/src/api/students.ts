import { type CreateStudentInput, type UpdateStudentInput } from "@hakko/core";
import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";

export interface Student {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface StudentRankEntry {
  id: string;
  awardedAt: string;
  notes: string | null;
  rank: {
    name: string;
    belt: string;
    order: number;
  };
}

class StudentsApi extends Http {

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

  async fetchStudentRanks(id: string): Promise<StudentRankEntry[]> {
    const { data } = await this.http.get(ApiRoutes.adminStudentRanks(id));
    return data.ranks;
  }

  async createStudentRank(
    studentId: string,
    payload: { rankId: number; awardedAt: string; notes?: string }
  ): Promise<StudentRankEntry> {
    const { data } = await this.http.post(ApiRoutes.adminStudentRanks(studentId), payload);
    return data.rank;
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
