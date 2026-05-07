import { toUtcDate } from "@hakko/core";
import {
  MAX_MONTH,
  MAX_YEAR,
  MIN_MONTH,
  MIN_YEAR,
} from "../lib/date-bounds.js";
import { HttpBadRequestError } from "../lib/http-errors.js";

/** Matches a date string in `YYYY-MM-DD` format. */
export const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export type YearMonthRange = {
  year: number;
  from: Date;
  to: Date;
};

/**
 * Parses and validates `year` (required) and `month` (optional) query params.
 * Returns a `{ year, from, to }` date range.
 * Throws `HttpBadRequestError` for invalid or out-of-bounds values.
 */
export function parseYearMonthParams(
  yearParam: string | undefined,
  monthParam: string | undefined,
): YearMonthRange {
  const year = Number(yearParam);

  if (!yearParam || isNaN(year)) {
    throw new HttpBadRequestError(
      "year query parameter is required and must be a number",
    );
  }

  if (year < MIN_YEAR || year > MAX_YEAR) {
    throw new HttpBadRequestError(
      `year must be between ${MIN_YEAR} and ${MAX_YEAR}`,
    );
  }

  let from: Date;
  let to: Date;

  if (monthParam !== undefined) {
    const month = Number(monthParam);
    if (isNaN(month) || month < MIN_MONTH || month > MAX_MONTH) {
      throw new HttpBadRequestError(
        `month must be between ${MIN_MONTH} and ${MAX_MONTH}`,
      );
    }
    from = toUtcDate(year, month, 1);
    to = toUtcDate(year, month + 1, 1);
  } else {
    from = toUtcDate(year, 1, 1);
    to = toUtcDate(year + 1, 1, 1);
  }

  return { year, from, to };
}
