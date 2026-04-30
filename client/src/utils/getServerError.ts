import axios from "axios";

const getServerError = (error: unknown, isError: boolean): string | null => {
  if (!isError || !error) return null;
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.error;
    if (msg) return msg;
  }
  return "Something went wrong. Please try again.";
};

export default getServerError;
