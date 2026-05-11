import {
  type CreateStudentInput,
  type StudentCategory,
  type UpdateStudentInput,
} from "@hakko/core";
import { ApiRoutes } from "@lib/routes";

import { Http } from "./http";

export interface Student {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  category: StudentCategory | null;
  createdAt: string;
  image: string | null;
}

export interface StudentRankEntry {
  id: string;
  rankId: number;
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
    payload: { rankId: number; awardedAt: string; notes?: string },
  ): Promise<StudentRankEntry> {
    const { data } = await this.http.post(
      ApiRoutes.adminStudentRanks(studentId),
      payload,
    );
    return data.rank;
  }

  async updateStudentRank(
    studentId: string,
    rankEntryId: string,
    payload: { awardedAt: string; notes?: string },
  ): Promise<StudentRankEntry> {
    const { data } = await this.http.put(
      ApiRoutes.adminStudentRank(studentId, rankEntryId),
      payload,
    );
    return data.rank;
  }

  async deleteStudentRank(
    studentId: string,
    rankEntryId: string,
  ): Promise<void> {
    await this.http.delete(ApiRoutes.adminStudentRank(studentId, rankEntryId));
  }

  async updateStudent(
    id: string,
    payload: UpdateStudentInput,
  ): Promise<Student> {
    const { data } = await this.http.put(ApiRoutes.adminStudent(id), payload);
    return data.student;
  }

  async deleteStudent(id: string): Promise<void> {
    await this.http.delete(ApiRoutes.adminStudent(id));
  }

  async uploadStudentImage(id: string, file: File): Promise<string> {
    return this.uploadImage(ApiRoutes.adminStudentImage(id), file);
  }
}

export const studentsApi = new StudentsApi();
