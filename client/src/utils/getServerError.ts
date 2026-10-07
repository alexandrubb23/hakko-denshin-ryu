import axios from "axios";

/** The API answered 404: there is no such resource */
export const isNotFoundError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 404;

const getServerError = (error: unknown, isError = true): string | null => {
  if (!isError || !error) return null;
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.error;
    if (msg) return msg;
  }
  return "Something went wrong. Please try again.";
};

export default getServerError;
