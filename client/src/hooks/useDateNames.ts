import { useMemo } from "react";
import { useIntl } from "react-intl";

const capitalize = (value: string) =>
  value.charAt(0).toLocaleUpperCase() + value.slice(1).replace(/\.$/, "");

// Any year works; 2024-01-07 is a Sunday, so day index matches Date.getDay().
const monthDate = (month: number) => new Date(2024, month, 1);
const dayDate = (day: number) => new Date(2024, 0, 7 + day);

const range = (length: number) => Array.from({ length }, (_, i) => i);

/**
 * Localised month and day names for the active language.
 * Same shape and order as the arrays in `@constants/dateNames`.
 */
const useDateNames = () => {
  const { locale } = useIntl();

  return useMemo(() => {
    const format = (options: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(locale, options);

    const monthLong = format({ month: "long" });
    const monthShort = format({ month: "short" });
    const dayLong = format({ weekday: "long" });
    const dayShort = format({ weekday: "short" });
    const dayNarrow = format({ weekday: "narrow" });

    const DAY_NAMES_SHORT = range(7).map((d) =>
      capitalize(dayShort.format(dayDate(d))),
    );
    const DAY_NAMES_MINI = range(7).map((d) =>
      capitalize(dayNarrow.format(dayDate(d))),
    );
    // Monday-first calendar headers
    const toMondayFirst = (names: string[]) => [...names.slice(1), names[0]];

    return {
      MONTH_NAMES: range(12).map((m) =>
        capitalize(monthLong.format(monthDate(m))),
      ),
      MONTH_NAMES_SHORT: range(12).map((m) =>
        capitalize(monthShort.format(monthDate(m))),
      ),
      DAY_NAMES: range(7).map((d) => capitalize(dayLong.format(dayDate(d)))),
      DAY_NAMES_SHORT,
      DAY_HEADERS: toMondayFirst(DAY_NAMES_SHORT),
      DAY_HEADERS_MINI: toMondayFirst(DAY_NAMES_MINI),
    };
  }, [locale]);
};

export default useDateNames;
