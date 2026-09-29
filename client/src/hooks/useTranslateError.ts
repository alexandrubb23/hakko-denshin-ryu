import { useCallback } from "react";
import { useIntl } from "react-intl";

import ERROR_MESSAGE_IDS from "../i18n/errorMessages";

/**
 * Returns a function that translates an English error message coming from
 * zod schemas or the API. Unknown messages are returned as-is.
 */
const useTranslateError = () => {
  const intl = useIntl();

  return useCallback(
    (message?: string | null) => {
      if (!message) return message ?? null;
      const id = ERROR_MESSAGE_IDS[message];
      return id ? intl.formatMessage({ id }) : message;
    },
    [intl],
  );
};

export default useTranslateError;
