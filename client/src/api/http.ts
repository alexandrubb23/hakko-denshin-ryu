import axios, { type AxiosInstance } from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export abstract class Http {
  protected readonly http: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  protected async uploadImage(url: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await this.http.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.image as string;
  }
}
