import { createContext, useContext } from "react";

/** The HTTP response of a server render, filled in by the pages it renders */
export interface ServerResponse {
  status: number;
}

export const ServerResponseContext = createContext<ServerResponse | null>(null);

/**
 * Sets the status the server answers with; does nothing on the client.
 * Relies on renderToString finishing before the headers are sent, so it
 * needs rethinking if the server ever streams the render.
 */
export const useResponseStatus = (status: number) => {
  const response = useContext(ServerResponseContext);
  if (response) response.status = status;
};
